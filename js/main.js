function show_content(content) {
  var box = $('#preview_box');
  box.find('#preview_content').html(content || '无');
  box.css('display', 'block');
  box.dimBackground();
}


function parse_response(data) {
  var html = $(data);
  var content = $(html.find('.topic_content')).html();
  show_content(content);
}


function preview_request(url) {
  $.ajax({
    url: url,
    dataType: 'html',
    beforeSend: function() {
      $('#goto').attr('href', url);
    },
    success: parse_response
  });
}


function close_box() {
  var box = $('#preview_box');
  box.css('display', 'none');
  box.undim();
}


function go_n_close() {
  close_box();
  var url = $('#goto').attr('href');
  window.open(url);
}


function add_preview_button(topics) {
  $.each(topics, function(i, v) {
    v = $(v);
    var href = v.find('.item_title').find('a').attr('href');
    var bar = v.find('.small.fade');

    var a = $('<a>', {
      html: '&nbsp;预览&nbsp;•&nbsp;&nbsp;',
      id: 'preview_btn',
      href: 'javascript: void(0);',
      click: function() {
        preview_request(href);
      }
    });
    bar.prepend(a);
  });
}


function add_preview_box() {
  var box = $('<div>', {
    class: 'box',
    id: 'preview_box'
  });

  box.html($('<div>', {
    class: 'balance_area action'
  }).html($('<a>', {
    id: 'goto',
    text: ' → '
  })).append($('<a>', {
    id: 'gotoN',
    href: 'javascript: void(0);',
    text: ' ☞ ',
    click: go_n_close
  })).append($('<a>', {
    id: 'close',
    href: 'javascript: void(0);',
    text: ' X ',
    click: close_box
  }))).append($('<div>', {
    id: 'preview_content'
  }));

  $('body').append(box);
}


function initialize() {
  var topics = $('.cell.item, [class*=from_]');
  if (topics.length) {
    add_preview_button(topics);
    add_preview_box();
  }
}


initialize();
