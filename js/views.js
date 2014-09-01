var ViewFloor = Backbone.View.extend({
  el: $('#main'),

  initialize: function(){
    this.render()
  },

  render: function(){
    
    // render imagemap using room coords
    $('#map-rooms').html("");
    $.each(this.model.get('map'), function(index, coords) {
      // if it has 4 coords, it's a rect, else it's a poly
      var shape = coords.split(',').length == 4 ? 'rect' : 'poly';
      $('#map-rooms').append(
        // took me 1 week to realize why mapster didn't work... it needs the f***ing href!!
        '<area shape="'+shape+'" coords="'+coords+'" href="#">'
      );
    });

    // render floor img if available, else render text msg
    if(this.model.get('img')){
      image.attr('src',this.model.get('img'));
      txt_main.fadeOut(300, function(){
        timelapse.fadeIn(300);
        image.fadeIn(300, function(){
          // wait till the image is fully displayed to bind mapster
          // or else it bugs the image
          image.mapster(mapoptions);
        });
      });
    } else {
      showText('NO IMAGE AVAILABLE');
    };
    return this;
  }
});



var ViewOptions = Backbone.View.extend({  
  tagName: 'div',
  className: 'options',
  template: $('#tpl-options').html(),

  events: {
    'click .btn-edit': 'edit',
    'click .btn-delete': 'delete',
  },

  initialize: function(){
    this.render()
  },

  render: function(){
    this.$el.html(this.template);   // create html from template
    $('#listhead').append(this.el); // append to listhead
    return this;
  },

  edit: function(){
    this.$el.remove();
    $('#myModal').modal('hide');
    this.model.edit();
  },

  delete: function(){
    this.$el.remove();
    this.model.destroy();
  },
});



var ViewBook = Backbone.View.extend({
  tagName: 'tr',
  template: $('#tpl-booking').html(),

  events: {
    'click': 'select',
  },

  initialize: function(){
    this.model.on('destroy', function(){ // the handler must be an anon function
      this.$el.remove()                  // AND the context of 'this' must be
    }, this)                             // specified in the 3rd parameter for it to work!
    this.render();
  },

  render: function(){
    // _.template takes a (html) string template and returns a function
    // that takes a json object as context (for binding vars in the html)
    var render = _.template(this.template)(this.model.toJSON()); 
    this.$el.html(render);
    return this;
  },

  select: function() {
    $('#booklist .sel').removeClass('sel'); // remove any other selection present
    $('#listhead .options').remove();       // remove any options menu present
    this.$el.addClass('sel');               // select this element
    var options = new ViewOptions({         // create a new options menu for this model
      model: this.model
    });
  }
});



var ViewBookings = Backbone.View.extend({
  el: $('#booklist>tbody'),

  initialize: function(){
    this.collection.on('add remove reset', this.render, this);
    this.render();
  },

  render: function(){
    this.$el.empty();
    this.collection.each(this.renderBooking, this); // 2nd param is 'this' context... I think
    return this;
  },

  renderBooking: function(automagically_passed_model){  // yup, backbone sorcery
    var row = new ViewBook({
        model: automagically_passed_model
    });
    this.$el.append(row.render().el); // render the row and append it to the list (table)
    return this;
  }
});