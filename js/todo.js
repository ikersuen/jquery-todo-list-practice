$(document)
    .ready(function () {
        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }
          //Click "Add" Button will add text to to-do list
          $(document).on("click","#button",function(){
            //get value from input-text box for checkbox usage
            var $input = $(".input-text");
            //generate the checkbox content with UUID generated and content from input-text box
            var content ='<li id='+ generateUUID() + ' class="">' + '<input name="done-todo" type="checkbox" class="done-todo"><span class="text-edit">' + $input.val()+ '</span></li>';
            //append checkbox to the checklist
            $("ol").append(content);
            //reset input value
            $input.val("");
          });

          //Click "Enter" on the keyboard will add text to to-do list
          $('.input-text').bind("enterKey",function(e){
            //get value from input-text box for checkbox usage
            var $input = $(".input-text");
            //generate the checkbox content with UUID generated and content from input-text box
            var content ='<li id='+ generateUUID() + ' class="">' + '<input name="done-todo" type="checkbox" class="done-todo"><span class="text-edit">' + $input.val()+ '</span></li>';
            //append checkbox to the checklist
            $("ol").append(content);
            //reset input value
            $input.val("");
          });
          $('.input-text').keyup(function(e){
              if(e.keyCode == 13)
              {
                  $(this).trigger("enterKey");
              }
          });

          //Click on to-do list checkbox to check
          $(document).on("click",".done-todo",function() {
              if($(this).is(":checked")){
                  $(this).parent().addClass("checked");
              }else{
                  $(this).parent().removeClass("checked");
              }
          })

          //Click on "all"
          $(document).on("click","a[data-filter='all']",function() {
              $(".done-todo").each(function () {
                  $(this).parent().show();
              })
          })

          //Click on "active"
          $(document).on("click","a[data-filter='active']",function() {
              $(".done-todo").each(function (){
                  if($(this).is(":checked")){
                    $(this).parent().hide();
                  }else{
                    $(this).parent().show();
                  }
              })
          })

          //Click on "complete"
          $(document).on("click","a[data-filter='complete']",function() {
              $(".done-todo").each(function (){
                  if($(this).is(":checked")){
                    $(this).parent().show();
                  }else{
                    $(this).parent().hide();
                  }
              })
          })

          //Click on to-do list to edit text
          $(document).on("dblclick", "li", function() {
              $(this).children('span').attr("contenteditable", "true").focus;
              //Confirm lose focus
              $(this).children('span').keypress(function(e){
                  if(e.keyCode == 13)
                  {
                    $(this).attr("contenteditable", "false");
                  }
              });
          });

    });
