#mountable.js

### What is it?

An easier way to pass JSON content into a HTML table using jQuery

  - It's tiny! Just 3KB;
  - Easy to customize;
  - Allows callback functions;
  - jQuery required.

---

[View the demo](https://guimadaleno.github.io/demos/mountable)

---

### Installation

- Install via [Bower](http://bower.io) ```bower install --save mountable```
- Download via [GitHub](https://github.com/guimadaleno/mountable/archive/master.zip)

---

### How to use?

##### Turbo mode

Don't have time? Here we go!

- First off, create a `<table>` like this one. Note to that `<tr>` element with a class `mountable-model` listed below. This will be used by **MounTable**.
```html
<table class="table" id="example1">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email</th>
		</tr>
	</thead>
	<tbody>
		<tr class="mountable-model">
			<td><input type="text" name="first_name[]" class="form-control"></td>
			<td><input type="text" name="last_name[]" class="form-control"></td>
			<td><input type="text" name="email[]" class="form-control"></td>
		</tr>
	</tbody>
</table>
```
- Let's catch a small JSON code (or object) to be used in this example. Please note that the **key names** listed below **must be the same as** declared on the **input names** listed above.
```json
var jsonContentSimple =
[
    {
        "first_name": "John",
        "last_name": "Appleseed",
        "email": "john@appleseed.com"
    },
    {
    	"first_name": "João",
    	"last_name": "Canabrava",
    	"email": "joao@canabrava.com"
    },
    {
        "first_name": "Patrick",
        "last_name": "Grapeseed",
        "email": "patrick@grapeseed.com"
    },
    {
    	"first_name": "Xingling",
    	"last_name": "Ping Pong",
    	"email": "xingling@pingpong.com"
    }
];
```
- Here we go. Time to start **MounTable**. Note that the **ID** `#example1` ** listed below is the table's ID**.
```javascript
$('#example1').mounTable(jsonContentSimple);
```
And that's all! Enjoy your content in your table.

---

##### Complete mode
Do you want to fully customize **MounTable**? Here's all the options you'll need:

```javascript
$('#example').mounTable(jsonContentComplex,
{
	/* The model class */
	model: '.mountable-model',

	/* No console messages */
	noDebug: true,

	/* Options to your new line button */
	addLine:
	{
		/* New line button selector */
		button: "#button2",

		/* Callback function */
		onClick: function ()
		{
			console.log('Line added!');
		}
	},

	/* Options to your delete line button */
	deleteLine:
	{
		/* Delete line button selector */
		button: ".mountable-remove-line-2",

		/* Callback function */
		onClick: function ()
		{
			if (confirm("Are you sure?"))
			{
				console.log('Line removed!');
				return true;
			}
		}
	}
});
```

---

### Help?
Tweet me: [@guimadaleno](http://twitter.com/guimadaleno)

---

### License
GNU GPL

Peace!
