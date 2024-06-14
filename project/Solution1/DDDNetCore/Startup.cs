using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Infrastructure.Users;
using DDDSample1.Infrastructure.Friendships;
using DDDSample1.Infrastructure.Introductions;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Introductions;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<DDDSample1DbContext>(opt =>
            //     opt.UseInMemoryDatabase("DDDSample1DB")
            //     .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
             
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                              builder =>
                              {
                                  builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                              });
            });

            services.AddDbContext<DDDSample1DbContext>(opt => 
                opt.UseSqlServer("Password=Bruno_59;Persist Security Info=True;User ID=Lapr5_G59;Initial Catalog=LAPR5_G59;Data Source=lapr5bd.database.windows.net")
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IUserRepository,UserRepository>();
            services.AddTransient<IUserService,UserService>();
            
            services.AddTransient<IFriendshipRepository,FriendshipRepository>();
            services.AddTransient<IFriendshipService,FriendshipService>();

            services.AddTransient<IIntroductionRepository,IntroductionRepository>();
            services.AddTransient<IIntroductionService, IntroductionService>();            
        }
    }
}
