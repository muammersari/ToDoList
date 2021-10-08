using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.EntityFramework.Context
{
    public class ToDoListContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=MUAMMER\SQLEXPRESS; Database=ToDoListDB; uid=sa; pwd=ms14219019*;");
        }
        public DbSet<ToDoListModel> ToDoList_tbl { get; set; }
    }
}
