using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IToDoListService
    {
        ToDoListModel Add(ToDoListModel toDoList);
        List<ToDoListModel> GetList();
        ToDoListModel GetById(int id);
        List<ToDoListModel> GetByDate(DateTime startDate, DateTime endDate);
        ToDoListModel Update(ToDoListModel toDoListModel);
        ToDoListModel Delete(int id);

    }
}
