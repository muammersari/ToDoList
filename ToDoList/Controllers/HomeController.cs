using Business.Abstract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Concrete;

namespace ToDoListProject.Controllers
{
    public class HomeController : Controller
    {
        private IToDoListService _toDoListService;
        public HomeController(IToDoListService toDoListService)
        {
            _toDoListService = toDoListService;
        }
        public IActionResult Home() // Anasayfada tüm görevler otomatik getiriliyor
        {
            return View();
        }

        //Görev ekleme Metodu
        public JsonResult SaveTask(ToDoListModel toDoListModel)
        {
            var result = _toDoListService.Add(toDoListModel);
            if (result == null)
            {
                return Json(false); //gelen veri null ise hata döner
            }
            List<ToDoListModel> liste = new List<ToDoListModel>();
            liste.Add(result);
            return Json(liste);
        }

        //Tüm Görev Listesini Getirme Metodu
        public JsonResult GetList()
        {
            var result = _toDoListService.GetList();
            if (result == null)
            {
                return Json(false); //gelen veri null ise hata döner
            }
            return Json(result);
        }

        //Gönderilen tarih aralığına göre görev listesini filtreleyen metod
        public JsonResult GetListByDateTime(DateTime startdDate, DateTime endDate)
        {
            var result = _toDoListService.GetByDate(startdDate, endDate);
            if (result == null)
            {
                return Json(false); //gelen veri null ise hata döner
            }
            return Json(result);
        }

        // Görev statu durumunu tamamlandı veya tamamlanmadı güncelleyen metod
        public JsonResult StatusUpdate(int id, Boolean status)
        {
            var result = _toDoListService.GetById(id);
            if (result == null)
            {
                return Json(false); //gelen veri null ise hata döner
            }
            result.Status = status;
            var updateToDolist = _toDoListService.Update(result);
            if (updateToDolist == null) // güncelleme başarısız ise
            {
                return Json(false);
            }
            return Json(result);
        }

        // id si gönderilen görevi silen metod
        public JsonResult ToDoListDelete(int id)
        {
            var result = _toDoListService.Delete(id);
            if (result == null) // silme işlemi başarısız ise
            {
                return Json(false); //gelen veri null ise hata döner
            }
            return Json(result);
        }
    }
}
