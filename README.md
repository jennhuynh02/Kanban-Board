# Kanban-Board

Link to Project: https://jennhuynh02.github.io/Kanban-Board/

Kanban-Board is Kanban Board web application created by Jennifer Huynh and Michael Murry. The board consists of three default columns and three default task cards. Task cards and columns can be added to and deleted from the Kanban Board. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Motivation

Kanban-Board was inspired by the JS Olympic Hackathon event ran by Mintbean (https://sites.google.com/mintbean.io/javascriptbootcampolympics/home). This event was shared to us by an App Academy email blast. Jennifer Huynh and Michael Murry were both interested in this event and ended up teaming up together to create this Kanban-Board project.

## The Journey

Creating this project was not an easy task. There were hurdles we (Jenn and Michael) had to overcome. Some of these hurdes include.

### Ordering the columns correctly after a drag and drop
 * There was an issue of the drop function being ran more than once. We had to fix this issue by onDrop instead of onEnter. onDrop was eventually replaced by onDragEnd.

### Not triggering the columns drop function when a task card gets dropped
 * When designing the card drop function, we had the issue of the column drop function being called at the same time. This was due to the card being inside the column element. We ended up fixing this issue with the stopPropagation() command.

Jennifer Huyhn and Michael Murry both agreed this was a great experience and enjoyed participating in the Hackathan.

## How to use the Application

### Column Titles can be edited when clicked on and the two buttons under the title can be used for deleting columns and adding tasks.

<img width="222" alt="Screen Shot 2020-08-31 at 6 07 53 AM" src="https://user-images.githubusercontent.com/38839723/91723586-d3b53280-eb50-11ea-90bb-c4da09ecbf1b.png">

_When a column is deleted all the tasks cards in it are also deleted_

### Columns can be moved with drag and drop

<img width="475" alt="Screen Shot 2020-08-31 at 5 55 24 AM" src="https://user-images.githubusercontent.com/38839723/91722132-b1bab080-eb4e-11ea-8e87-e6c7bd4bce65.png">
<img width="458" alt="Screen Shot 2020-08-31 at 5 47 28 AM" src="https://user-images.githubusercontent.com/38839723/91722107-a8314880-eb4e-11ea-8f83-7b873c509951.png">

### Clicking the task card title allows you to edit it.

<img width="209" alt="Screen Shot 2020-08-31 at 5 47 51 AM" src="https://user-images.githubusercontent.com/38839723/91721802-322ce180-eb4e-11ea-98ae-d795b633c019.png">

### Clicking the task card description allows you to edit it

<img width="196" alt="Screen Shot 2020-08-31 at 5 48 00 AM" src="https://user-images.githubusercontent.com/38839723/91721862-4a046580-eb4e-11ea-899b-c981f046f6b2.png">

### Task cards can be moves with the menu buttons or drag and drop
<img width="464" alt="Screen Shot 2020-08-31 at 6 02 21 AM" src="https://user-images.githubusercontent.com/38839723/91722786-9e5c1500-eb4f-11ea-9183-bcd7047d7ff6.png">
<img width="401" alt="Screen Shot 2020-08-31 at 6 01 28 AM" src="https://user-images.githubusercontent.com/38839723/91722801-a1ef9c00-eb4f-11ea-8897-6ca767465037.png">

The delete menu item can delete the card, and the hide button will hide the description. 

### Example of the button from the menu displayed as show 
<img width="193" alt="Screen Shot 2020-08-31 at 6 05 02 AM" src="https://user-images.githubusercontent.com/38839723/91723035-00b51580-eb50-11ea-9259-705aa80ea9ba.png">



## Kanban-Board Team
  -----------------------------------------------------------------

### Co-Leader: Jenn Huynh
### [LinkedIn](https://www.linkedin.com/in/jenniferanhhuynh/)
### [Github](https://github.com/jennhuynh02)

  -----------------------------------------------------------------

### Co-Leader: Michael Murry
### [LinkedIn](https://www.linkedin.com/in/michael-murry-b3746a1a6/)
### [Github](https://github.com/MichaelMurry49)

  -----------------------------------------------------------------


