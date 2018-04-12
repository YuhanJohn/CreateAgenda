/*
	MounTable.js

	Developed by Guilherme Augusto Madaleno <guimadaleno@me.com>
	www.guimadaleno.com
	(C) 2014 All rights reserved
	Licensed under GNU GPL
*/
		var y = document.getElementsByClassName("posSel");
		$(document).ready(function(){
			$.getJSON("https://www.googleapis.com/blogger/v3/blogs/4267204410839545163/pages/7826106760647590919?key=AIzaSyBmT4ZycIuDhq4Bk4aYQGuDynt6ib-u690",function(result){
				mapjson = JSON.parse(result.content);
				//addOptions();
			});
		});
		
		/*function addOptions(){
			//alert(y.length);
			y[y.length-1].innerHTML += '<option value=""></option>';
			for(var i=0 ; i < mapjson.Points.length ; i++){	
				//alert(mapjson.Points[i].Position);
				if(mapjson.Points[i].Beacon==""){
					y[y.length-1].innerHTML += '<option value="'+mapjson.Points[i].Position+'">'+mapjson.Points[i].Position+'</option>';
				}
			}
		}*/
		
$.fn.mounTable = function (content, options)
{

	var opt =
	{
		debug: (options && options.noDebug) ? false : true,
		fn:
		{
			element: 		"",
			model:
			{
				class: 		(options && options.model) ? options.model : ".mountable-model",
				content: 	"",
				length: 	Object.keys($(this).find((options && options.model) ? options.model : ".mountable-model")).length,
				newLine: 	(options && options.addLine && options.addLine.button) ? options.addLine.button : ".mountable-new-line",
				origin: 	"",
				saved: 		"",
			},
			table: this
		}
	};

	var fn =
	{
		
		init: function ()
		{
			
			if (content && content.length)
			{
				
				if (!$(opt.fn.table).length)
				{

					if (opt.debug)
					{
						console.log('MounTable: Table ' + opt.fn.table.selector + ' not found!');
					}

				}
				else
				{
					
					$.each(content, function (i, line)
					{

						if (line)
						{
							
							$.each(line, function (j, input)
							{
								
								if ($.type(input) === 'string' || $.type(input) === 'number')
								{
											
									opt.fn.element = $(opt.fn.table).find(opt.fn.model.class).find('input[name="' + j + '[]"], input[name="' + j + '"], select[name="' + j + '[]"], select[name="' + j + '"]');

									if (opt.fn.element.prop('tagName') == "INPUT")
									{

										if (opt.fn.element.attr('type') == 'text')
										{
											opt.fn.element.attr('value', input);
										}
										else if (opt.fn.element.attr('type') == 'checkbox')
										{

											if (opt.fn.element.length > 1)
											{

												$.each(opt.fn.element, function (k, checkbox)
												{

													if (checkbox.value == input)
													{
														checkbox.setAttribute('checked', 'checked');
													}
													else
													{
														checkbox.removeAttribute('checked');
													}

												});

											}

										}

									}
									else if (opt.fn.element.prop('tagName') == "SELECT")
									{

										opt.fn.element.val(input);
										opt.fn.element.children('option').attr('selected', false);
										opt.fn.element.children('option[value="' + input + '"]').attr('selected', 'selected');

									}

								}
								else if ($.type(input) === 'array')
								{

									opt.fn.element = $(opt.fn.table).find(opt.fn.model.class).find('select[name="' + j + '[]"], select[name="' + j + '"]');

									if (opt.fn.element.prop('tagName') == "SELECT")
									{

										selectOpts = false;

										$.each(input, function(l, value)
										{
											selectOpts += '<option value="' + value + '">' + value + '</option>';
										});

										opt.fn.element.html(selectOpts);
										opt.fn.element.attr('data-mountable-filled-up-selectbox', 'yes');

									};

								}

							});

							opt.fn.model.dom = $(opt.fn.table).find(opt.fn.model.class);
							opt.fn.model.content = $(opt.fn.table).find(opt.fn.model.class).html();

							$(opt.fn.table).find(opt.fn.model.class).parent().append('<tr>' + opt.fn.model.content + '</tr>');

							$(opt.fn.table).find(opt.fn.model.class + ' input').each(function()
							{

								if ($(this).prop('type') == "text")
								{
									$(this).attr('value', "");
								}
								else if ($(this).prop('type') == "checkbox")
								{

									$(this).each(function()
									{
										$(this).attr('checked', false);
									});

								}

							});

							$(opt.fn.table).find(opt.fn.model.class + ' select').each(function()
							{

								$(this).find('option').each(function()
								{
									$(this).removeAttr('selected');
								});

								$(this).attr('value', "");

								if ($(this).attr('data-mountable-filled-up-selectbox') == 'yes')
								{
									$(this).html(' ');
								}

							});

						}

					});

				}

				opt.fn.model.saved = '<tr>' + $(opt.fn.table).find(opt.fn.model.class).html() + '</tr>';
				opt.fn.model.origin = $(opt.fn.table).find(opt.fn.model.class).parent();

				if (opt.debug)
				{
					console.log('MounTable: content successfully mounted on ' + opt.fn.table.selector);
				}

				$(opt.fn.model.newLine).off('click').on('click', function()
				{

					if (options.addLine.onClick && $.type(options.addLine.onClick) === "function")
					{
					
						if (options.addLine.onClick($(opt.fn.table).find(opt.fn.model.class)) === true)
						{

							opt.fn.model.origin.append(opt.fn.model.saved);
							fn.deleteLine();
							//addOptions();
						}

					}

				});

				fn.deleteLine();
				$(opt.fn.table).find(opt.fn.model.class).remove();

			}

		},

		deleteLine: function ()
		{
			if (options && options.deleteLine && options.deleteLine.button)
			{

				$(options.deleteLine.button).off('click').on('click', function()
				{

					if (options.deleteLine.onClick && $.type(options.deleteLine.onClick) === "function")
					{

						if (options.deleteLine.onClick() === true)
						{
							$(this).parent().parent().remove();
						}

					}
					else
					{
						$(this).parent().parent().remove();
					}

				});

			}

		}

	};

	fn.init();

};