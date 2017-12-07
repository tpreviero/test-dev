var URL_API = location.pathname + 'api.php';

jQuery.getJSON('http://fipeapi.appspot.com/api/1/test-dev/marcas.json', function (json) {
    var carrosMarcasOption = jQuery('#carros__option--marcas').html();
    var render = Mustache.render(carrosMarcasOption, {
        option: json
    });
    jQuery('#formSave select').append(render);
});

jQuery("#formSave").submit(function (event) {
    event.preventDefault();

    var $form = jQuery(this);
    var url = $form.attr('action');
    var data = {
        "marca": jQuery('#formSave option:selected').val(),
        "modelo": jQuery('input[name=modelo]').val(),
        "ano": jQuery('input[name=ano]').val()
    };
    if (jQuery('input[name=id]').val()) {
        var id = jQuery('input[name=id]').val();
        data['id'] = id;
    }

    jQuery
        .post(URL_API, data)
        .done(function (res) {
            var data = jQuery.parseJSON(res);
            var carrosListaItem = jQuery('#carros__lista--item').html();
            var render = Mustache.render(carrosListaItem, {
                item: data
            });
            jQuery('#lista-carros table tbody')
                .empty()
                .append(render);

        });
    
        $form[0].reset();
});

jQuery('#formLista').submit(function (event) {
    event.preventDefault();

    var $form = jQuery(this);
    var url = $form.attr('action');
    jQuery.get(url, {
            view_all: true
        })
        .done(function (res) {
            var data = jQuery.parseJSON(res);
            view_all(data);
        });
});

function view(id) {

    jQuery
        .get(URL_API, {
            view: id
        })
        .done(function (res) {
            var data = jQuery.parseJSON(res);
            var carrosListaItem = jQuery('#carros__lista--item').html();
            var render = Mustache.render(carrosListaItem, {
                item: data
            });
            jQuery('#lista-carros table tbody')
                .empty()
                .append(render);

        });
    history.pushState('', null, location.pathname);
}

function view_all() {
    jQuery
        .get(URL_API, {
            view_all: 'true'
        })
        .done(function (res) {
            var data = jQuery.parseJSON(res);
            var carrosListaItem = jQuery('#carros__lista--item').html();
            jQuery('#formSave').find('.btn-primary').removeAttr('hidden');
            jQuery('#formSave').find('.btn-danger').attr('hidden', 'hidden');
            var render = Mustache.render(carrosListaItem, {
                item: data
            });
            if (data.length) {
                jQuery('#lista-carros table tbody')
                    .empty()
                    .append(render);
            }
        });
    history.pushState('', null, location.pathname);
}

function edit(id) {
    jQuery
        .get(URL_API, {
            edit: id
        })
        .done(function (res) {
            var data = jQuery.parseJSON(res);
            jQuery('#formSave').find('.btn-primary').attr('hidden', 'hidden');
            jQuery('#formSave').find('.btn-danger').removeAttr('hidden');
            jQuery('#formSave').find('input[name=id]').val(data['id']);
            var carrosListaItem = jQuery('#carros__lista--item').html();
            var render = Mustache.render(carrosListaItem, {
                item: data
            });
            jQuery('#lista-carros table tbody')
                .empty()
                .append(render);
        });
    history.pushState('', null, location.pathname);
}

function del(id) {
    jQuery
        .get(URL_API, {
            del: id
        })
        .done(function (res) {
            view_all();
        });
    history.pushState('', null, location.pathname);
}

view_all();