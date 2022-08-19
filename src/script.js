$(function () {
  $('#alert').hide();
  $.ajax({
    type: 'GET',
    url: 'employes.json',
    dataType: 'json',
    success: function (response) {
      //
    },
  }).done(function (response) {
    $('tbody>tr').replaceWith(generateRow(response));
  });

  function generateRow(data) {
    if (!$.isEmptyObject(data)) {
      let table = '';
      for (let i = 0; i < data.length; i++) {
        table +=
          '<tr><td>' +
          data[i].lastName +
          ' </br>' +
          data[i].firstName +
          ' </br>' +
          data[i].surname +
          ' </td><td>' +
          data[i].position +
          ' </td><td>' +
          data[i].address +
          '</td><td><button type="button" id="edit-btn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-edit">Изменить</button></td><td><button id="delete-btn" type="button" class="btn btn-info">Удалить</button></td></tr>';
      }

      return table;
    }
  }

  function showAlert() {
    $('#alert')
      .slideDown(200, function() {
        $('#alert').delay(2000).slideUp(200)
      })
  }

  $('#create-form').on('submit', function (event) {
    event.preventDefault();
    let data = [];
    let obj = {};
    $('#create-form input').each(function () {
      obj[this.name] = $(this).val();
    });
    data.push(obj);
    $('tbody>tr:last').after(generateRow(data));
    $('#create-form').trigger('reset');
    $('#alert h2').html('Сотрудник успешно добавлен')
    showAlert();
  });

  $(document).on('click', '#delete-btn', function (event) {
    event.preventDefault();
    let row = $(this).parents('tr');
    let name = $(row).find('td:first').text();
    let conf = confirm(`Хотите удалить сотрудника ${name}?`);
    if (conf) {
      $(row).fadeOut(400, function () {
        $(this).remove();
      });
    }
  });

  $(document).on('click', '#edit-btn', function (event) {
    event.preventDefault();
    $(this).parents('tr').attr('select', 'selected');
    let elem = $(event.target)
      .parents('tr')
      .children(':nth-last-child(n+3)')
      .text();
    elem = elem.split(' ');

    $('#edit-form input[name="lastName"]').val(elem[0]);
    $('#edit-form input[name="firstName"]').val(elem[1]);
    $('#edit-form input[name="surname"]').val(elem[2]);
    $('#edit-form input[name="position"]').val(elem[3]);
    $('#edit-form input[name="address"]').val(elem[4]);
  });

  $('#edit-form').on('submit', function (event) {
    event.preventDefault();
    let row = $('tr[select="selected"]');
    console.log(row);
    let data = [];
    let obj = {};
    $('#edit-form input').each(function () {
      obj[this.name] = $(this).val();
    });
    data.push(obj);
    console.log(data);
    $(row).replaceWith(generateRow(data));
    $('#alert h2').html('Успешно изменено')
    showAlert();
  });
});
