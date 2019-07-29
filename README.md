# A Narrative Visualization
## The Effect of Oil Price Fluctuations on Truck vs. Car Sales, Manufacturing Numbers, and Efficiency


### Messaging
*What is the message you are trying to communicate with the narrative visualization?*

The key message I want to show is the deep connection between oil prices and car and truck sales year over year. The big take away from the history tour is **as gas prices decrease, truck sales increase**. However, if gas prices increase, truck sales and often lightweight car sales both stagnate. I also want to show the overwhelming trend that **trucks car retail sales generally increasing rapidly over the past 50 years**.

### Narrative Structure
*Which structure was your narrative visualization designed to follow (martini glass, interactive slide show or drop-down story)? How does your narrative visualization follow that structure? (All of these structures can include the opportunity to "drill-down" and explore. The difference is where that opportunity happens in the structure.)*


My narrative visualization follows the interactive slide show. In an interactive slide show, you follow an author directed path through a slide show, where on each path the user can drill down into some details of each slide. My visualization very clearly follows this structure with seven slides clearly laid out on the right side of the web page. It follows a similar structure to the New York budget forecasts article presented as an example an interactive slide show.

The first five slides take the user on a historical tour through the history of oil prices since 1978. The first slide of these five is an overview presenting two line charts from 1974 to 2018 showing how gasoline prices and car/ truck sales changed year over year. The next four slides use cross filtering on these line charts by year to focus on four distinct periods over these 44 years. The last two slides are also overviews showing the similar relationship between gasoline prices and automakers supply, and the fuel economy of their production choices.

Please refer to the 'Scenes' section for a better overview of the contents of the slides and order.

Regarding drilling down on each slide, I added several features. First, the option to hover over any scatter point and get *more* details. For example if you hover over any scatter point on the truck / car retail sales scatter plot, the visualization provides a market share breakdown between the trucks and cars.

Second, I allow the user to select a year range on any slide so they can focus on any range of years they desire. There is a 'Reset Slide' button to reset the year range back to the years we are discussing on the particular slide.

Thirdly, I provide annotations on the chart for corresponding relevant world events and notes to the side of each slide, highlighting the unique aspects of the period we're drilling into.

### Visual Structure
*What visual structure is used for each scene? How does it ensure the viewer can understand the data and navigate the scene? How does it highlight to urge the viewer to focus on the important parts of the data in each scene? How does it help the viewer transition to other scenes, to understand how the data connects to the data in other scenes?*

For each slide, we use a very consistent visual structure. On the top of each slide, we have the same title / headline message. On the left of each slide, there is a paginator, which tells you which slide you are on, the years in question, and some notes unique to this current slide. And to the right of this pager, there are the actual charts composing the scene. This scene is a coordinated set of two charts with the same x-axis; the top chart is always the gasoline prices of a specific year range and the bottom chart is the corresponding truck or car sales for that same time range.

Having the two charts right above each other with the same x-axis of ears, allows the user to easily understand the relationship between gasoline pricing and the car sales for that time period. I help the user understand the data by providing several in-chart annotations to point out the interesting events. The notes corresponding to each scene allow the user to learn more about the time period.

Ultimately my goal is to get the user to answer the following question for every time period: how did the oil price change during this time and how did car sales/ production correspondingly change?

While the annotations are placed to help the reader get specific details on each scene, the paginator is crucial to help the viewer transition between scenes. The paginator area has an additional "Next" and "Prev" button that helps the user go to the next slide and highlights the current slide the user is on. In our context, each slide is one scene.

How is the data connected between each scenes? The timeline is the key underlying basis of each scene. Each scene focuses on a specific time period besides the first overview and the last two supplemental scenes. When the user clicks "Next" they are moving on to the next time period in American oil and auto history. I have carefully curated this history into distinct time periods based on major events and trends. This allows the user to smoothly get a historical tour by just clicking "Next", checking out the charts, and reading my notes.

### Scenes
*What are the scenes of your narrative visualization? How are the scenes ordered, and why*

Each scene in my narrative visualization corresponds to a particular slide. Each scene follows the same consistent template: for a given range of years, then scenes has two charts perfectly aligned vertically, one plotting gas prices vs years and the second plotting car/ truck retail sales vs years. They have the same x-axis. The last two supplemental charts try to add insight into similar statistics like manufacturing rates and fuel economy, but they have the same consistent scene template, just with different data.

The scenes are ordered mainly chronologically. However, the first one is an overview scene presenting the full dataset inviting the reader to go forward and look at details, and the last two slides also cover the entire timeline because they highlight slightly different data on the same timescale. However, the main four slides smoothly highlight different time periods and trends.

Overview of the Slides: Each slide shows the relationship between gas prices and ...
- Slide 1) (Full Data) Truck/ Car Sales YOY
- Slide 2) 1976-1981 Retail Truck/ Car Sales YOY
- Slide 3) 1981-2002 Retail Truck/ Car Sales YOY
- Slide 4) 2002-2008 Retail Truck/ Car Sales YOY
- Slide 5) 2008-2018 Retail Truck/ Car Sales YOY
- (Supplemental) Slide 6) (Full Data) Retail Truck/ Car Manufacturing Supply YOY
- (Supplemental) Slide 7) (Full Data) Fuel Economy and Emissions YOY

I really wanted to focus on car sales in this visualization so I guide the user across four slides to give periodical details. My aim with the last two slides was to perhaps show the user that the trends we discussed are also applicable to related statistics and the correlations we witnessed still hold. Additionally, the supplemental slides could potentially inspire the reader to check out other trends.

### Annotations
*What template was followed for the annotations, and why that template? How are the annotations used to support the messaging? Do the annotations change within a single scene, and if so, how and why*

There are two types of annotations used in the narrative visualization. The first type of annotations are those on the chart; each annotation on both plots corresponds to a particular year. For example, the first slide which is an overview of all the years has all the annotations. How is it used the support the messaging? As we want to study the relationship between gas prices and truck / car sales, events marking a substantial change in gas prices or vehicle sales were annotated. This would help show the overall trends in gas pricing or retail sales that we are trying to uncover through our visualization.

The second type of annotation are those that provide some background for a particular scene. These provide related background explaining the trends for the time period of the scene in question. Regarding messaging, these annotation mostly aim to provide context, but they often explicitly state the trend that we are trying to show through the chart.

Regarding consistent templates, the in-chart annotations corresponding to a certain year were defined programmatically to be a couple pixels above the y-axis of the highest line plot for the current line plot. Thus they are the highest point on the chart along the same year x-axis line as the year they correspond to. For the summary notes, they are always bulleted on the left side of the slide. The bullets aim to promote user attention while the consistent location aims to eliminate user discomfort.

The annotations do not change within a scene unless the user cross-filters by year. If the user includes a particular year with a corresponding annotation, that annoation may show up in the scene, while the annotations for the years excluded will not show up. However, each slide has a designated year range so the user can always click "Reset Slide" to return to this range.

With the helpful "Reset Slide" button, the consistent positioning of all the in-chart annotations on the top of every chart, and the constant annotations corresponding to specific years, the visualization helps the reader get the charts' message without feeling disoriented.

### Parameters
*What are the parameters of the narrative visualization? What are the states of the narrative visualization? How are the parameters used to define the state and each scene?*

Parameters the variables used to control the scene and other scene elements. We use slide number, dataset, and year range as our parameters.
Note that we always use the gas pricing vs time dataset on all scenes but we use vehicles retail sales vs time for the first five scenes, and a manufacturing vs time and climate dataset for the last two supplemental scenes.

##### Parameters in our visualization
| Slide Number |     Dataset for Second Chart     | Year Range       |
|:------------:|:--------------------------------:|------------------|
|       1      |  Truck/ Car Retail Sales vs Year | 1976-2018 (full) |
|       2      |  Truck/ Car Retail Sales vs Year |     1976-1981    |
|       3      |  Truck/ Car Retail Sales vs Year |     1981-2002    |
|       4      |  Truck/ Car Retail Sales vs Year |     2002-2008    |
|       5      | Truck/ Car Retail Sales vs Year  |     2008-2018    |
|       6      | Truck/ Car Manufacturing vs Year | 1976-2018 (full) |
|       7      | Fuel Economy/ Emissions vs Year  | 1976-2018 (full) |

Every one of the seven scenes defined by those three parameters. For the particular slide number, we use the oil pricing dataset and the dataset specified by the center parameter above and focus on a pre-defined year range.

While drilling down the user may mess with the 'Year range' parameter and explore many other possible scenes but the "Reset Slide" button will bring the user back to one of these seven states.

The user has flexibility to navigate between slide numbers and alter the year ranges between 1976 and 2018 and can discover other states.


### Triggers
*What are the triggers that connect user actions to changes of state in the narrative visualization? What affordances are provided to the user to communicate to them what options are available to them in the narrative visualization?*

The biggest trigger I want the user to use is the paginator or the "prev" and "next" buttons. I put them in big primary blue color to draw the users attention in an otherwise color-less file. The next button movies the user to the next slide while the prev button moves the user to the prev slide. To understand how changing slides affects the parameters, refer to the table above for information on how the parameters change between slides.

The user is also allowed to change th Start Year and End Year for each scene. I draw attention to this by bolding "Filter by range of years", hopefully inspiring them to play around with the year parameter.
