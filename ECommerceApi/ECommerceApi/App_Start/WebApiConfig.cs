using ECommerceLibrary;
using ECommerceLibrary.Database;
using ECommerceLibrary.Exceptions;
using ECommerceLibrary.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using Unity;
using Unity.WebApi;

namespace ECommerceApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var container = new UnityContainer();
            container.RegisterType<IDatabaseService, SqlService>();
            container.RegisterType<ILogger, ExceptionLogger>();
            container.RegisterType<ProductRepository, ProductRepository>();
            config.DependencyResolver = new UnityResolver(container);

            // Configure Web API with the dependency resolver.
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            // Enable cors
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
        }
    }
}
