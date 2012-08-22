$ ->
  jQuery.validator.addMethod "date_validate", (date, element) ->
    return this.optional(element) or date.match(/^\d{4}(\-\d{2}){2}$/)

  $("#event_date_selector").datepicker
    changeMonth: true
    changeYear: true
    showOtherMonths: true
    selectOtherMonths: true
    onSelect: (dateText, inst) ->
      $("#date_filter").val dateText
      $("#date_output_opt").val "0"
      $(this).parent("form").submit()


  $("#event_date").datepicker
    changeMonth: true
    changeYear: true
    showOtherMonths: true
    selectOtherMonths: true
    dateFormat: "yy-mm-dd"

#  при клике на форму проверять валидацию
  $('#event_date, #event_title').click ->
    validator = $("form").validate()
    validator.resetForm()

  # validate form on keyup and submit
  $("#EventForm").validate
    errorElement: "span"
    onkeyup: false
    onfocusout: false
    rules:
      "event[title]":
        required: true
        minlength: 3
        maxlength: 64
      "event[date]":
        required: true
        date_validate: true

    messages:
      "event[title]":
        required: "Введите название события"
        minlength: "Поле не может содержать менее 3 символов"
        maxlength: "Поле не может содержать более 64 символов"
      "event[date]":
        required: "Выберите дату"
        date_validate: "В формате: '2012-12-31'"

    errorPlacement: (error, element) ->
      error.insertAfter(element)

  $('#event_date_selector').datepicker("setDate", new Date(Date.parse($('#date_target_date').val(),"dd/MM/yyyy")))

  $('#date_output_opt').change ->
    $('#dateFilterForm').submit()

  if $('.table.table-bordered.table-striped td:nth-child(2)').text() != ''
    $("table.table.table-bordered.table-striped").tablesorter(
        sortList: [[1,0]]
        dateFormat: 'uk'
      )

