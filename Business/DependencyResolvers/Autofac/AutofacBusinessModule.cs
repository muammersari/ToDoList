using Autofac;
using Autofac.Extras.DynamicProxy;
using Business.Abstract;
using Business.Concrete;
using Castle.DynamicProxy;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.DependencyResolvers.Autofac
{
    public class AutofacBusinessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //register ettiğimiz interface lerimiz burada yer alıyor ve yönetimi buradan yapılıyor
            builder.RegisterType<ToDoListManager>().As<IToDoListService>();
            builder.RegisterType<EfToDoListDal>().As<IToDoListDal>();
        }

    }
}
