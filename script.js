/*
Samir Khoulani
Samir_khoulani@student.uml.edu
12/09/16
HW8 Token
The purpose of this javascript is to create tabbed tables on the fly, and also
make them deletable. In addition, every tab is also able to be deleted at once,
and there is slider funtionality for the bounds of the  multiplication tables.
I used www.stackoverflow.com/questions/18572586/append-to-dynamically-created-tab
for help with tabs.
*/

$(document).ready(function() {

    $('#form').validate({
        rules:
        {
            horbegin:
            {
                required: true,
                digits: true,
                range: [0, parseInt($('#horend').val())]
            },
            horend:
            {
                required: true,
                digits: true,
                range: [parseInt($('#horbegin').val()), 10]
            },
            vertbegin:
            {
                required: true,
                digits: true,
                range: [0, parseInt($('#vertend').val())]
            },
            vertend:
            {
                required: true,
                digits: true,
                range: [parseInt($('#vertbegin').val()), 10]
            }

        }
    });

    var tabIndex = 0;
    $("#submitTable").on("click", function(e) {
        // This prevents the default action to refresh using the passed event parameter, and lets the chart stay on the page.
        e.preventDefault();
        if(!$("#form").valid()) {
            return;
        }

        //This defines the element of the message that will be thrown for errors.
        var errorMessage = document.createElement("P");

        // Here, I am storing the user input into strings.
        var horBeginString = document.getElementsByName('horbegin')[0].value;
        var horEndString = document.getElementsByName('horend')[0].value;
        var vertBeginString = document.getElementsByName('vertbegin')[0].value;
        var vertEndString = document.getElementsByName('vertend')[0].value;

        // Here, I parse the user input into integers, and store them.
        var hor_begin = parseInt(horBeginString);
        var hor_end = parseInt(horEndString);
        var vert_begin = parseInt(vertBeginString);
        var vert_end = parseInt(vertEndString);

        // Defining the table element for the page.
        var table = document.createElement('table');

        var temp;

        // These two below if statements allow the user to enter any bounds,
        // with the result taking the values from least to greatest
        if (hor_begin > hor_end ) {
            temp = hor_end;
            hor_end = hor_begin;
            hor_begin = temp;
        }
        if (vert_begin > vert_end ) {
            temp = vert_end;
            vert_end =  vert_begin;
            vert_begin = temp;
        }

        // The table is now constructed, using nested table data, which make up the rows, which make up the entire table.
        for (var i = vert_begin-1; i <= vert_end; i++) {
            // A basic table row element is created here.
            var tr = document.createElement('tr');

            // Creating the table data for row i
            for (var j = hor_begin-1; j <= hor_end; j++) {
                // A single table element is created here.
                var td = document.createElement('td');

                // Creating the table data for column j
                var val = document.createTextNode(''+i*j);

                // This sets the top left corner as blank
                if(j == hor_begin-1 && i == vert_begin-1) {
                    val = document.createTextNode('');
                }
                // This writes the multiplicands in order for the first row
                else if(i == vert_begin-1) {
                    val = document.createTextNode(''+j);
                }
                // This writes the multiplicands in order for the first column
                else if(j == hor_begin-1) {
                    val = document.createTextNode(''+i);
                }
                // Adding the text node to the data element
                td.appendChild(val);

                // Adding the table data to the row
                tr.appendChild(td);
            }
            // Adding the completed row to the table
            table.appendChild(tr);
        }


        $("#tabs").show();
        $("#tabs").tabs();

        //incrementing the tab index
        tabIndex++;

        //This is dynamically appending a list item to the tabs unordered list.
        $("#tabs ul").append("<li><a href='#tab" + tabIndex + "'>(" + hor_begin
        + " to " + hor_end + ") X (" + vert_begin + " to " + vert_end + ")</a>"
        + "<span class='ui-icon ui-icon-close' role='presentation'></span>"
        + "</li>");

        // Here I am actually adding the multiplication table to the tab
       $("#tabs").append('<div id="tab' + tabIndex + '"></div>');

       // This refreshes and activates the created tab
        $("#tabs").tabs("refresh");
        $("#tabs").tabs("option", "active", -1);
        // The completed table is then appended to the current tab.
        $("#tab" + tabIndex).append(table);


         // This is detecting the click of the individual delete "x" button
         $(document).on("click", ".ui-icon-close", function(){
           var tab = $(this).data("tab");
           $("div#" + tab).remove();
           $(this).closest("li").remove();
           // Set the current active tab to the last tab
           $("#tabs").tabs({
               "active": -1
           });

           $("#tabs").tabs("refresh");

           if ($("#tabs ul li").length == 0) {
               for(var i = 1; i <= tabIndex; i++)
                   $("#tab" + i).remove();
               $("#tabs").hide();
           }


       });


    });


    //This section allows the slider to update the text input
    $("#range1").on("change", function(){ document.getElementById("horbegin").value = this.value});
    $("#range2").on("change", function(){ document.getElementById("horend").value = this.value});
    $("#range3").on("change", function(){ document.getElementById("vertbegin").value = this.value});
    $("#range4").on("change", function(){ document.getElementById("vertend").value = this.value});

    //This section allows the text input to update the slider
    $("#horbegin").on("change", function(){
        var val = this.value;
        if($("#form").valid())
            document.getElementById("range1").value = val;
    });
    $("#horend").on("change", function(){
        var val = this.value;
        if($("#form").valid())
            document.getElementById("range2").value = val;
    });
    $("#vertbegin").on("change", function(){
        var val = this.value;
        if($("#form").valid())
            document.getElementById("range3").value = val;
    });
    $("#vertend").on("change", function(){
        var val = this.value;
        if($("#form").valid())
            document.getElementById("range4").value = val;
    });


    // This detects the pressing of the deleteTables button, which deletes every
    // tab and table
    $("#deleteTables").click(function() {

        $("#tabs").tabs("destroy");
        document.getElementById('tabs').innerHTML = "<ul class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all' role='tabs'></ul>";
        tabIndex = 0;
        $("#tabs").hide();

    });

});
