import {ElementRef, Injectable} from "@angular/core";
import * as THREE from 'three';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {graph} from "../dtos/graph";
import * as baseGraph from '../baseGraph';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import Stats from "three/examples/jsm/libs/stats.module";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import TextSprite from '@seregpie/three.text-sprite';
import {Friendship} from "../dtos/friendship";
import {User} from "../dtos/user";
import {Path} from "../dtos/path";
import {ConsultPathService} from "./ConsultPathService";
import {BoxGeometry, Mesh, MeshBasicMaterial, Raycaster} from "three";


@Injectable({providedIn: 'root'})
export class graphService {

  private graphUrl = 'https://lapr5backend.azurewebsites.net/api/Graph';
  private pathService: ConsultPathService | undefined;

  private canvas: HTMLCanvasElement | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private auxCube: Mesh<BoxGeometry, MeshBasicMaterial> | undefined;
  private cameraMinimap: THREE.OrthographicCamera | undefined;
  private scene!: THREE.Scene;
  private pointlight1: THREE.PointLight | undefined;
  private pointlight2: THREE.PointLight | undefined;
  private cameraLight: THREE.DirectionalLight | undefined;
  private ambientLight: THREE.AmbientLight | undefined;
  private stats: Stats | undefined;
  private controls: OrbitControls | undefined;
  private baseGraph!: baseGraph.Graph<User>;
  private comparator!: (a: User, b: User) => number;
  private geometry!: THREE.SphereGeometry;
  private arrayNode!: Observable<Friendship[][]>;
  private node: baseGraph.Node<User>[] = [];

  private selectedNodes: baseGraph.Node<User>[] = [];
  private selectedEdges: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshPhongMaterial>[] = [];
  private edges: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshPhongMaterial>[] = [];
  private dom: HTMLCanvasElement | undefined;
  private path: Path | undefined;
  private user: User | undefined;
  private raycaster: THREE.Raycaster | undefined;
  private rect: any;
  private nodeIntersected: any;
  private mouse = new THREE.Vector2();
  private onClickPosition = new THREE.Vector2();
  private tip: TextSprite | undefined;
  private collidableMeshList: Mesh[] = [];
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.pathService = new ConsultPathService(http);
  }

  setRotateZ(ang: number) {
    // @ts-ignore
    this.camera.rotation.y = ang;
    // @ts-ignore
    this.auxCube.rotation.y = ang;
  }

  getRotateZ = () => {
    // @ts-ignore
    return this.camera.rotation.y;
  };


  getGraphByUserWithLevel(data: graph): Observable<Friendship[][]> {
    const url = `${this.graphUrl}/${data.id}/${data.lvl}/GraphFriendshipsPrint`;
    return this.http.get<Friendship[][]>(url).pipe(map(answer => {
      return answer
    }));
  }


  getMousePosition(dom: HTMLCanvasElement, x: number, y: number) {

    const rect = dom.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];

  }

  getIntersects(point: THREE.Vector2, objects: THREE.Object3D<THREE.Event>[]) {

    this.mouse.set((point.x * 2) - 1, -(point.y * 2) + 1);

    // @ts-ignore
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // @ts-ignore
    return this.raycaster.intersectObjects(objects, false);

  }

  updateMouseLocation(event: MouseEvent) {
    this.mouse.x = (event.clientX - this.rect.left) / this.rect.width * 2.0 - 1.0;
    this.mouse.y = -(event.clientY - this.rect.top) / this.rect.height * 2.0 + 1.0;
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>, list: Observable<Friendship[][]>) {
    this.canvas = canvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: false, //background transparente
      antialias: true //anti-alising, reduz serrilhamento
    });
    this.geometry = new THREE.SphereGeometry(4, 20);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000000);
    this.camera.position.z = 5;

    this.raycaster = new THREE.Raycaster();

    this.dom = this.renderer.domElement;
    this.rect = this.dom.getBoundingClientRect();

    const onMouseDown = (event: MouseEvent) => {

      // @ts-ignore
      const array = this.getMousePosition(this.dom, event.clientX, event.clientY);
      this.onClickPosition.fromArray(array);

      // left click on a node
      if (event.buttons == 1) {
        const intersects = this.getIntersects(this.onClickPosition, this.scene.children);
        if (intersects.length > 0) {
          let flag = true;
          let i = 0;
          while (flag && i < intersects.length) {
            this.nodeIntersected = intersects[i].object;
            // verify that the selected object is a node
            if (this.nodeIntersected.type == "Mesh" && this.nodeIntersected.geometry == this.geometry && this.user) {
              flag = false;
              let dest;
              for (let node of this.baseGraph.nodes.values()) {
                // find selected node
                if (this.nodeIntersected.position.x == node.pos.x &&
                  this.nodeIntersected.position.y == node.pos.y &&
                  this.nodeIntersected.position.z == node.pos.z) {
                  dest = node;
                }
              }

              if (dest) {
                // find shortest path

                // @ts-ignore
                this.pathService.consultShortestPath(this.user.name, dest.data.name).subscribe(
                  (data) => {
                    // paint nodes
                    this.path = data;
                    if (this.path) {
                      // iterate through nodes in smallest path
                      for (let n of this.path?.caminho) {
                        // iterate through all nodes in graph
                        for (let node of this.baseGraph.nodes.values()) {
                          // find node from path
                          if (node.data.name == n) {
                            this.selectedNodes.push(node);
                            // paint node in red
                            // @ts-ignore
                            node.draw.material = new THREE.MeshStandardMaterial({
                              color: 0xe01600,
                              opacity: 1
                            });
                          }
                        }
                        // paint first node in blue
                        this.selectedNodes.values().next().value.draw.material = new THREE.MeshStandardMaterial({
                          color: 0x0000FF,
                          opacity: 1
                        });
                      }
                    }
                    // paint edges
                    let k = 1;
                    // iterate through nodes in smallest path
                    for (let j = 0; j < this.selectedNodes.length - 1; j++) {
                      // iterate through all edges in graph
                      for (let e of this.edges) {
                        // calculate edge position
                        let aux = this.selectedNodes[k].pos.clone().add(this.selectedNodes[j].pos).divideScalar(2);
                        // find edge with that position
                        if (e.position.x == aux.x &&
                          e.position.y == aux.y &&
                          e.position.z == aux.z) {
                          this.selectedEdges.push(e);
                          // paint edge in red
                          e.material = new THREE.MeshPhongMaterial({
                            color: 0xe01600
                          });
                        }
                      }
                      k++;
                    }
                  }
                );
              }
            }
            i++;
          }
        }
      }
      // right click resets changes
      if (event.buttons == 2) {
        for (let node of this.selectedNodes) {
          // @ts-ignore
          node.draw.material = new THREE.MeshPhongMaterial({
            color: 0xf1e4d9,
            opacity: 0.6
          });
        }
        this.selectedNodes = [];
        for (let edge of this.selectedEdges) {
          edge.material = new THREE.MeshPhongMaterial({color: 0x000000});
        }
        this.selectedEdges = [];
      }
    }

    const onMouseMove = (event: MouseEvent) => {

      // @ts-ignore
      const array = this.getMousePosition(this.dom, event.clientX, event.clientY);
      this.onClickPosition.fromArray(array);

      const intersects = this.getIntersects(this.onClickPosition, this.scene.children);

      if (intersects.length > 0) {
        let flag = true;
        let i = 0;
        while (flag && i < intersects.length) {
          this.nodeIntersected = intersects[i].object;
          // verify that the selected object is a node and this tip has not been drawn
          if (this.nodeIntersected.type == "Mesh" && this.nodeIntersected.geometry == this.geometry && this.user && this.tip == undefined) {
            flag = false;
            for (let node of this.baseGraph.nodes.values()) {
              // find selected node
              if (this.nodeIntersected.position.x == node.pos.x &&
                this.nodeIntersected.position.y == node.pos.y &&
                this.nodeIntersected.position.z == node.pos.z) {
                console.log(node.data.name);
                this.drawTip(node);
              }
            }
          }
          i++;
        }
      } else
        // remove tip
      if (this.tip) {
        this.scene.remove(this.tip);
        this.tip = undefined;
      }
    }

    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);

    this.scene = new THREE.Scene();
    window.addEventListener('resize', () => {
      this.resize();
    });

    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper);

    const KEYADVANCE = 87;// advance key
    const KEYBACKOFF = 83;// back off key
    const KEYROTATELEFT = 65;//left rotate key
    const KEYROTATERIGHT = 68;// right rotate key
    const KEYUP = 80; // go up key
    const KEYDOWN = 76; // go down key
    const VIEW_INCREMENT = 2;        // amount to move
    const ROTATE_INCREMENT = Math.PI / 100; // amount to rotate

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      var keyCode = event.which;
      switch (keyCode) {
        case KEYADVANCE:
          var vectorD = new THREE.Vector3();
          var vectorP = new THREE.Vector3();
          this.camera?.getWorldDirection(vectorD);
          this.camera?.getWorldPosition(vectorP);
          var oldPosition = this.camera?.position;
          var vectorNewPosition = vectorP.add(vectorD.multiplyScalar(VIEW_INCREMENT));
          // @ts-ignore
          this.auxCube.position.x = vectorNewPosition.x;
          // @ts-ignore
          this.auxCube.position.y = vectorNewPosition.y;
          if (this.colide(vectorD)) {
            // @ts-ignore
            this.auxCube.position.x = oldPosition.x;
            // @ts-ignore
            this.auxCube.position.y = oldPosition.y;
            break;
          }
          // @ts-ignore
          this.camera.position.x = vectorNewPosition.x;
          // @ts-ignore
          this.camera.position.y = vectorNewPosition.y;
          break;

        case KEYBACKOFF:

          var vectorD = new THREE.Vector3();
          var vectorP = new THREE.Vector3();
          this.camera?.getWorldDirection(vectorD);
          this.camera?.getWorldPosition(vectorP);
          var oldPosition = this.camera?.position;
          var vectorNewPosition = vectorP.add(vectorD.multiplyScalar(-VIEW_INCREMENT));
          // @ts-ignore
          this.auxCube.position.x = vectorNewPosition.x;
          // @ts-ignore
          this.auxCube.position.y = vectorNewPosition.y;
          if (this.colide(vectorD)) {
            // @ts-ignore
            this.auxCube.position.x = oldPosition.x;
            // @ts-ignore
            this.auxCube.position.y = oldPosition.y;
            break;
          }
          // @ts-ignore
          this.camera.position.x = vectorNewPosition.x;
          // @ts-ignore
          this.camera.position.y = vectorNewPosition.y;
          break;

        case KEYUP:
          // @ts-ignore
          this.auxCube.position.z += VIEW_INCREMENT;
          if (this.colide(new THREE.Vector3(0, 0, 1))) {
            // @ts-ignore
            this.auxCube.position.z = this.camera.position.z;
            break;
          }
          // @ts-ignore
          this.camera.position.z = this.auxCube.position.z;
          break;

        case KEYDOWN:
          // @ts-ignore
          this.auxCube.position.z -= VIEW_INCREMENT;
          if (this.colide(new THREE.Vector3(0, 0, 1))) {
            // @ts-ignore
            this.auxCube.position.z = this.camera.position.z;
            break;
          }
          // @ts-ignore
          this.camera.position.z = this.auxCube.position.z;
          break;

        case KEYROTATELEFT:
          this.setRotateZ(this.getRotateZ() + ROTATE_INCREMENT);
          break;

        case KEYROTATERIGHT:
          this.setRotateZ(this.getRotateZ() - ROTATE_INCREMENT);
          break;

      }
      this.camera?.updateProjectionMatrix();
      this.auxCube?.updateMatrixWorld();
      //this.controls?.update();
    };
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Create the camera corresponding to the 2D scene
    this.cameraMinimap = new THREE.OrthographicCamera(-58.0, 58.0, 58.0, -58.0, 0.0, 212.0);
    this.cameraMinimap.position.set(0, 54, 0);
    this.cameraMinimap.lookAt(new THREE.Vector3(0, 0, 0));


    this.pointlight1 = new THREE.PointLight(0x000000); //luz branca
    this.pointlight2 = new THREE.PointLight(0x000000); //luz branca
    this.ambientLight = new THREE.AmbientLight(0xFFFF00); //luz amarela
    this.cameraLight = new THREE.DirectionalLight(0xFFFFFF);
    this.pointlight1.position.z = 10;
    this.pointlight2.position.z = -10;
    this.scene.add(this.cameraLight);
    this.scene.add(this.pointlight1);
    this.scene.add(this.pointlight2);
    this.scene.add(this.ambientLight);
    document.body.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement); //permite controlar a camera
    /*this.controls.keys = {
     LEFT: "ArrowLeft", //left arrow
     UP: "ArrowUp", // up arrow
     RIGHT: "ArrowRight", // right arrow
     BOTTOM: "ArrowDown" // down arrow
    }*/


    const geometry1 = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var wireMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    const edges1 = new THREE.EdgesGeometry(geometry1);
    this.auxCube = new THREE.Mesh(geometry1, wireMaterial);
    this.auxCube.position.set(0, -50, 0);
    this.scene.add(this.auxCube);

    this.camera.position.set(0, -50, 0);
    this.camera.lookAt(new THREE.Vector3(0, 20, 0));
    const info = document.createElement("div");
    const id_attr = document.createAttribute("name");
    id_attr.nodeValue = "graph-info";
    info.setAttributeNode(id_attr);
    document.body.appendChild(info);


    // Stats.js

    this.stats = Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.right = '0px';

    document.body.appendChild(this.stats.domElement);

    this.createBaseGraphCommon(list);
  }

  public createBaseGraphCommon(list: Observable<Friendship[][]>) {
    this.baseGraph = new baseGraph.Graph<User>(this.comparator);
    var friendshipList = list;
    let nodes: User[] = [];
    friendshipList.subscribe(friendships => {
      friendships.forEach(friendshipsL => {
        friendshipsL.forEach(friendship => {

          if (!nodes.some(n => n.id === friendship.friendA.id)) {
            nodes.push(friendship.friendA);
            this.baseGraph.addNode(friendship.friendA);
          }
          if (!nodes.some(n => n.id === friendship.friendB.id)) {
            nodes.push(friendship.friendB);
            this.baseGraph.addNode(friendship.friendB);
          }

          this.baseGraph.addEdge(<User>nodes.find(n => n.id == friendship.friendA.id), <User>nodes.find(n => n.id == friendship.friendB.id));
        });
      });
      var anticol = 0;
      nodes.forEach(node => {
        if (anticol == 0) {
          this.user = node;
          var n = this.baseGraph.nodes.get(node);
          if (!n) return;
          this.drawFirstNode(n);
        } else {
          var n = this.baseGraph.nodes.get(node);
          if (!n) return;
          this.drawNode(n, anticol * 10);
        }
        anticol++;
      });
      friendships.forEach(friendshipsL => {
        friendshipsL.forEach(friendship => {
          var friendA = this.baseGraph.nodes.get(<User>nodes.find(n => n.id == friendship.friendA.id));
          if (!friendA) return;
          var friendB = this.baseGraph.nodes.get(<User>nodes.find(n => n.id == friendship.friendB.id));
          if (!friendB) return;
          this.drawEdge(friendA, friendB, friendship.connectionStrength);
        });
      });

    });
  }

  getCommonFriendsGraph(userId: string, friendName: string): Observable<Friendship[][]> {
    const url = `${this.graphUrl}/CommonFriends/${userId}/${friendName}`;
    return this.http.get<Friendship[][]>(url).pipe(map(answer => {
      return answer
    }));
  }

  /* public createBaseGraph(list: Observable<Friendship[][]>) {

     let anticol = 0;
     this.baseGraph = new baseGraph.Graph<User>(this.comparator);
     this.arrayNode = list;
     let nodes: string | any[], node1: baseGraph.Node<User>, node2: baseGraph.Node<User>;
     this.arrayNode.subscribe(answer => {
       nodes = answer;
       let bol: boolean = false;
       for (let i = 0; i < nodes.length; i++) {
         node1 = this.baseGraph.addNode(nodes[i][0].friendA);
         for (let k = 0; k < this.node.length; k++) {
           if (this.node[k].data.id === node1.data.id) {
             node1 = this.node[k];
             break;
           }
         }

         for (let j = 0; j < nodes[i].length; j++) {
           //cria o primeiro node no centro
           if (i == 0 && j == 0) {
             this.drawFirstNode(node1);
             this.node.push(node1);
           }
           bol = false;
           node2 = this.baseGraph.addNode(nodes[i][j].friendB);
           for (let k = 0; k < this.node.length; k++) {
             //serve para remover dados repetidos
             if (this.node[k].data.id === node2.data.id) {
               bol = true;
               this.baseGraph.removeNode(node2.data);
               node2 = this.node[k];
               break;
             }
           }

 <<<<<<< HEAD
           if (!bol) {
             this.drawNode(node2);
 =======
           if (!bol){
             anticol++;
             this.drawNode(node2,anticol*10);
 >>>>>>> 9a75cc0b11e23919d79fda5512aa2bb30b12d625
             this.node.push(node2);
           }
           const connectionStrength = nodes[i][j].connectionStrength;
           this.drawEdge(node1, node2, connectionStrength);
         }
       }
     });
   }*/

  public drawNode(node: baseGraph.Node<User>, antiCollison: number) {
    const draw = new THREE.Mesh(this.geometry, new THREE.MeshPhongMaterial({
      color: 0xf1e4d9,
      opacity: 0.6
    }));
    const area = 50;
    draw.position.x = area - antiCollison;
    draw.position.y = Math.floor(Math.random() * (area + area + 1) - area);
    draw.position.z = Math.floor(Math.random() * (area + area + 1) - area);

    const sprite = this.drawEmotion(node.data.state);

    if(sprite == undefined){
      return;
    }

    sprite.scale.set(10, 10, 1);
    sprite.position.x = draw.position.x;
    sprite.position.y = draw.position.y + 15;
    sprite.position.z = draw.position.z;

    node.draw = draw;
    node.pos = draw.position;
    this.scene.add(draw);
    this.collidableMeshList.push(draw);
    const instance = new TextSprite({
      alignment: 'center',
      color: '#24ff00',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: 5,
      text: node.data.name
    });
    instance.position.x = draw.position.x;
    instance.position.y = draw.position.y + 6;
    instance.position.z = draw.position.z;
    this.scene.add(instance);
    this.scene.add(sprite);
  }

  public drawFirstNode(node: baseGraph.Node<User>) {
    const draw = new THREE.Mesh(this.geometry, new THREE.MeshPhongMaterial({
      color: 0xf1e4d9,
      opacity: 0.6
    }));
    draw.position.x = 0;
    draw.position.y = 0;
    draw.position.z = 0;

    const sprite = this.drawEmotion(node.data.state);

    if(sprite == undefined){
      return;
    }

    sprite.scale.set(10, 10, 1);
    sprite.position.x = draw.position.x;
    sprite.position.y = draw.position.y + 15;
    sprite.position.z = draw.position.z;

    node.draw = draw;
    node.pos = draw.position;
    this.scene.add(draw);
    this.collidableMeshList.push(draw);
    const instance = new TextSprite({
      alignment: 'center',
      color: '#24ff00',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: 5,
      text: node.data.name
    });
    instance.position.x = draw.position.x;
    instance.position.y = draw.position.y + 6;
    instance.position.z = draw.position.z;
    this.scene.add(instance);
    this.scene.add(sprite);
  }

  drawEmotion(emotion: string): THREE.Sprite | undefined{

    let mapTexture;
    let sprite;
    if (emotion == "Angry") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/s9cvKPL/angry.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Grateful") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/PMRW3FL/grateful.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Remorseful") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/fk2kPQL/remorseful.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Proud") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/m5sN8Dc/proud.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Disappointed") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/B4VCRtg/disapointed.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Relieve") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/n75Xjs8/relieved.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Fearful") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/D4r886t/Fearful.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Hopeful") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/1sCqM4F/hopeful.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Distressed") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/Jn9fgTn/distressed.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    if (emotion == "Joyful") {
      mapTexture = new THREE.TextureLoader().load("https://i.ibb.co/tcvT9km/joyful.png");
      const labelMaterial = new THREE.SpriteMaterial({
        map: mapTexture,
      });
      sprite = new THREE.Sprite(labelMaterial);
    }

    return sprite;
  }

  public drawEdge(source: baseGraph.Node<User>, target: baseGraph.Node<User>, connection: string) {

    const HPI = Math.PI / 2;
    const distance = source.pos.distanceTo(target.pos);
    const position = target.pos.clone().add(source.pos).divideScalar(2);

    const con = parseInt(connection);

    const geometry = new THREE.CylinderGeometry(0.5 + con / 3, 0.5 + con / 3, distance, 5, 1, false);
    const material = new THREE.MeshPhongMaterial({color: 0x000000});

    const orientation = new THREE.Matrix4();//a new orientation matrix to offset pivot
    const offsetRotation = new THREE.Matrix4();//a matrix to fix pivot rotation
    orientation.lookAt(source.pos, target.pos, new THREE.Vector3(0, 1, 0));//look at destination
    offsetRotation.makeRotationX(HPI);//rotate 90 degs on X
    orientation.multiply(offsetRotation);//combine orientation with rotation transformations
    geometry.applyMatrix4(orientation);

    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(position.x, position.y, position.z);
    this.edges.push(cylinder);
    this.scene.add(cylinder);
    this.collidableMeshList.push(cylinder);
  }

  drawTip(source: baseGraph.Node<User>) {
    //create rectangle
    /*const geometry = new THREE.PlaneGeometry(10, 15);
    const material = new THREE.SpriteMaterial(
      {color: 0xffff00, side: THREE.DoubleSide});
    const plane = new THREE.Sprite(material);
    plane.geometry = geometry;
    plane.position.x = source.pos.x;
    plane.position.y = source.pos.y + 17;
    plane.position.z = source.pos.z;
    this.scene.add(plane);*/

    /*
        var geometry = new THREE.PlaneGeometry(10, 15);
        var material = new THREE.MeshPhongMaterial({side:THREE.DoubleSide, color:0xffff00} );
        var plane = new THREE.Mesh( geometry, material );

        //create text
        var loader = new FontLoader();
        loader.load('js/examples/fonts/helvetiker_regular.typeface.json', (font) =>{
          var geometry2 = new TextGeometry( "teste", {
            font: font,
            size: 5,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 0.1
          } );
          var txt_mat = new THREE.MeshPhongMaterial({color:0xffffff});
          var txt_mesh = new THREE.Mesh(geometry2, txt_mat);

          txt_mesh.position.x = source.pos.x;
          txt_mesh.position.y = source.pos.y + 17;
          txt_mesh.position.z = source.pos.z;
          this.scene.add(txt_mesh);
        });
    */

    this.tip = new TextSprite({
      alignment: 'center',
      color: '#24ff00',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: 5,
      text: '(' + source.data.tag.toString() + ')'
    });
    this.tip.position.x = source.pos.x;
    this.tip.position.y = source.pos.y - 6;
    this.tip.position.z = source.pos.z;
    this.scene.add(this.tip);
  }

  public render() {

    // @ts-ignore
    this.cameraLight.position.copy(this.camera.position);
    // @ts-ignore
    this.renderer.setScissor(window.innerWidth - 410, window.innerHeight - window.innerHeight / 2 - 300, 400, 230);
    // @ts-ignore
    this.renderer.setClearColor(0xffb6c1, 1);
    // @ts-ignore
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    // @ts-ignore
    this.renderer.clear();
    // @ts-ignore
    this.renderer.render(this.scene, this.camera);
    // @ts-ignore
    this.renderer.setViewport(window.innerWidth - 410, window.innerHeight - window.innerHeight / 2 - 300, 400, 230);
    // @ts-ignore
    this.renderer.setScissorTest(true);
    // @ts-ignore
    this.renderer.setClearColor(0xFFFFFF, 1);
    // @ts-ignore
    this.renderer.clear();

    // @ts-ignore
    this.renderer.render(this.scene, this.cameraMinimap);
    // @ts-ignore
    this.renderer.setScissorTest(false);
    this.stats?.update();
  }

  public resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // @ts-ignore
    this.camera.aspect = width / height;
    // @ts-ignore
    this.camera.updateProjectionMatrix();
    // @ts-ignore
    this.renderer.setSize(width, height);
  }

  public animate() {

    requestAnimationFrame(() => this.animate());
    //this.controls?.update(); //se tiver autoRotate, comentei para a rotacao da camera funcionar com o keyboard
    this.render();
  }


  public colide(vectorD: THREE.Vector3): boolean {
    // @ts-ignore
    for (var vertexIndex = 0; vertexIndex < this.auxCube.geometry.attributes.position.array.length; vertexIndex++) {
      // @ts-ignore
      var ray = new THREE.Raycaster(this.auxCube.position, vectorD.clone().normalize());
      // @ts-ignore
      var collisionResults = ray.intersectObjects(this.collidableMeshList);
      if (collisionResults.length > 0 && collisionResults[0].distance < vectorD.length()) {
        console.log("COLISION DETECTED");
        return true;
      }
    }
    return false;
  }

}
