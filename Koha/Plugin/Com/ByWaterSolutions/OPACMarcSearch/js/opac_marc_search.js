$.get("/api/v1/contrib/opacmarcsearch/static/html/opac_marc_search.html",function(data){
  $("#advsearch .main .container-fluid").prepend(data);
});

//$("#advsearch .main .container-fluid").prepend('<div class="row"><div class="col order-first order-md-first order-lg-2"><fieldset class="marcSearch" style="display:none;" disabled="disabled"><legend>MARC search</legend><a class="hide_marc_search" >Click to hide MARC search</a><p>You must specify a marc field, subfield, and value to search, incomplete rows will be ignored.</p><div class="advanced-search-terms extended"><div class="marc-tag-row"><div class="search-field-input"><label for="marc_tag"> Field:</label><input class="marc_tag" type="text" name="marc_tag" size="3" autofocus=""><label for="marc_subfield"> Subfield:</label><input class="marc_subfield" type="text" name="marc_subfield" size="1" autofocus=""><label for="marc_value"> Content:</label><input class="marc_value" type="text" name="marc_value" size="50" autofocus=""><a href="#" class="marcButtonPlus" title="Add another field"><i class="fa fa-plus-square" aria-hidden="true"></i></a><a style="display:none;" href="#" class="marcButtonMinus" title="Remove field"><i class="fa fa-minus-square" aria-hidden="true"></i></a></div></div></div><p><input id="marcSearch" class="btn btn-primary" accesskey="m" name="do" title="Search" value="Search"></p></fieldset></div></div>');

$("#advsearch .main #booleansearch h1").after('<a class="show_marc_search">Click for MARC search</a>');
$("body#advsearch").on('click','.marcButtonPlus',function(){
  let this_field = $(this).closest(".marc-tag-row");
  let new_field = this_field.clone();
  new_field.find('input').val('');
  this_field.after(new_field);
  $(".marcButtonMinus").show();
});
$("body#advsearch").on('click','.marcButtonMinus',function(){
  let this_field = $(this).closest(".marc-tag-row");
  this_field.remove();
  if( $(".marcButtonPlus").length < 2 ){
      $(".marcButtonMinus").hide();
  }
});
$("body#advsearch").on('click','#marcSearch',function(){
    let marc_search = '';
    $(".marcSearch .search-field-input").each(function(){
      let marc_tag = $(this).find('.marc_tag').val();
      let marc_subfield = $(this).find('.marc_subfield').val();
      let marc_value = $(this).find('.marc_value').val();
      if( marc_tag.length && marc_subfield.length && marc_value.length ){
         marc_search += '&q=marc_data_array.fields.' + marc_tag;
         marc_search += '.subfields.' + marc_subfield;
         marc_search += '=' + marc_value;
      }
    });
    if( marc_search.length ){
      $(".no_marc_search").hide();
      $(location).attr('href', '/cgi-bin/koha/opac-search.pl?sort_by=relevance&do=Search'+marc_search);
    } else {
      $(".no_marc_search").show().focus();
    }
});
$("body#advsearch").on('click','.show_marc_search',function(){
    $(".marcSearch").show().prop('disabled',false);
    $(".show_marc_search").toggle();
});
$("body#advsearch").on('click','.hide_marc_search',function(){
    $(".marcSearch").hide().prop('disabled',true);
    $(".show_marc_search").toggle();
});
