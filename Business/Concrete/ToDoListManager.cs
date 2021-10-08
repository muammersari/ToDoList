using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class ToDoListManager : IToDoListService
    {
        private IToDoListDal _toDoListDal;
        public ToDoListManager(IToDoListDal toDoListDal)
        {
            _toDoListDal = toDoListDal;
        }

        //Ekleme metodu
        public ToDoListModel Add(ToDoListModel toDoList) //liste veri tabanına eklenir
        {
            var result = _toDoListDal.Add(toDoList);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        //Silme metodu
        public ToDoListModel Delete(int id) // id si gönderilen görev siliniyor
        {
            var result = _toDoListDal.Get(x => x.Id == id); // görev var mı kontrol ediliyor
            if (result == null)
            {
                return null;
            }
            _toDoListDal.Delete(result); // görev var ise siliniyor
            return result;
        }

        //Tarih aralığına göre filtreleme metodu
        public List<ToDoListModel> GetByDate(DateTime startDate, DateTime endDate) //İlgili tarih alanı arasındaki tüm liste döndürülür
        {
            var result = _toDoListDal.GetList(x => x.StartDate >= startDate && x.StartDate <= endDate).ToList();
            if (result == null)
            {
                return null;
            }

            return result;
        }

        //id si verilen görevi getiren metod
        public ToDoListModel GetById(int id)
        {
            var result = _toDoListDal.Get(x => x.Id == id);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        //Tüm görevleri listeleyen metod
        public List<ToDoListModel> GetList()
        {
            var result = _toDoListDal.GetList().OrderBy(x => x.StartDate).ToList();
            if (result == null)
            {
                return null;
            }
            return result;
        }

        // gönderilen görev modelini güncelleyen metod
        public ToDoListModel Update(ToDoListModel toDoListModel)
        {
            var result = _toDoListDal.Update(toDoListModel); // öyle bir görev var mı kontrol ediliyor
            if (result == null)
            {
                return null;
            }
            return result; //güncellenen değer döndürülüyor
        }
    }
}
