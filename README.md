# Project-4
Book recommendations 
## Proposal
Title: Project 4 - Book Rating and Recommendations
Members: Ryan Eikanger, Elisabeth Jansen, Melissa Judy, Julia Lee, Brittany Thomas

Aims: (1) Develop a model that uses machine learning to predict the projected average rating of a new book based on specific book features. (2) Develop a model that uses machine learning to suggest books based on history and interactions of the individual user and other users. The intended user group for these models are book publishers and individual users. Descriptive and exploratory data analysis will provide context and background for the predictive models and output (predicted book rating and book recommendations).

Process: Review the datasets available on Goodreads (https://mengtingwan.github.io/data/goodreads.html#datasets) and determine which datasets provide the information needed to train the model and perform exploratory analysis for context. Read in data in json and csv files to Pandas for data cleaning and exploration. 

From Goodreads Book Graph Datasets:
Basic Statistics of the Complete Book Graph:
2,360,655 books (1,521,962 works, 400,390 book series, 829,529 authors)
876,145 users; 228,648,342 user-book interactions in users' shelves (include 112,131,203 reads and 104,551,549 ratings)

At least 2 data analytics tools will be used to supplement the machine learning. 

The data model implementation will use a python script and try out several applications (keras, cosine similarity from sklearn matrix, TensorFlow, TorchRec, Natural Language Toolkit) to initialize, scale, train, execute and evaluate a model that will be used to predict the average book rating for newly published books as well as book recommendations for prospective readers. The data will be cleaned via the above process and then normalized and standardized prior to modeling. At least one model will utilize data retrieved from Spark and demonstrate meaningful predictive power of at least 75% classification accuracy or 0.80 R-squared. Overall model performance will be printed at the end of the python script. Iterative data models optimization and evaluation will be documented.

## Process: 
During the first class, the topic of developing a model related to providing book recommendations and predicting a new book's average rating was chosesn. The group was able to quickly identify Goodreads datasets (https://mengtingwan.github.io/data/goodreads.html#datasets) to explore data and build a predictive model. These included two comprehensive datasets, "goodreads_books.json.gz" (2gb) and "goodreads_interactions.csv" (4.1gb). Additional json files that parsed data by genre were also available. Guidance about accessing and exploring data provided by Goodreads (referenced below) was reviewed. A proposal was drafted by the group and tasks were divided into (1) the initial data retrieval, cleaning and exploration steps and (2) development of the predictive models, both of which were worked on outside of class independently. 

### Data Retreival
Data retrieval involved accessing the data and loading it into a pandas dataframe using a python script. Several methods were attempted to read in the large goodreads_books.json.gz (2gb) and goodreads_interactions.csv (4.1gb) files including:
1. downloading and reading in the json file via pd.read_json or the csv file via pd.read_csv in Jupyter notebook - both produced a memory error
2. reading in the json file using google collab - memory error
3. reading in the json file directly from the url - memory error
4. reading in smaller json files directly from the url, segregated by genre, directly from the urls on https://mengtingwan.github.io/data/goodreads.html#datasets (8 total genres) with the goal of joining the data in a pandas dataframe - memory error was encountered by the 4th read in

We were successfully able to load data into MongoDB and accessed via MongoDB Compass. A database was created called 'books'; this housed a single collection called 'books' that included data read in from all 8 smaller datasets by genre (e.g. "goodreads_books_children.json.gz"). The final collection included 1.5M documents with each document containing 30 data fields. A data field was added to capture the genre name (called "genre") as this was not included in the source files. 

### Data Cleaning
Data was read in to Pandas using MongoClient from pymongo. The password is stored locally. Data cleaning included converting certain variables (e.g. average_rating) from str to float for analysis purposes; dropping and reording columns and checking for missing values. Clean data was utilized for data exploration and pre-processing. 


### Descriptive Analysis and Data Exploration (Melissa, Brittany)
A subset of random documents was generated as a dataframe accessing the 1.5M records in MongoDB using the aggregate function and $sample to limit the number of returned documents to 10000 due to memory and processing issues. This random sampling is a representation of the larger dataset. Queries to obtain interesting datapoints such as the most reviewed book, least reviewed book and the longest book in the random dataset were performed. Prior to converting str to float in the clean_df, descriptive analyses was done to gain insights on the categorical data and verify the 10,0000 sampling displayed the expected characteristics (count, unique, top, frequency) which it did (e.g. 10,000 = title count; 8 = unique genre; etc). The groupby function was used to generate a dataframe calculating the average rating by genre across 5 decades (5 earlier decades were dropped due to lack of data) and graphed (line graph) to demonstrate trends in ratings over a 50 year time period as well as comparisons between genres in a single visualization using matplotlib.pyplot. Relationships between average rating other variables such as book format, book length and publication month were also explored. A scatterplot was generated to show the distribution of ratings by book length (number of pages).

The results of the descriptive analysis produced interesting facts about the dataset to provide context for the predictive model. Exploratory analysis using a random sample of 10,000 documents elicited relationships between variables and the average rating a user would give a book (between 1-5). The overall average rating was 3.9. Longer books tended to score better in ratings whereas publication month did not affect overall ratings. Hardcover and kindle books were the only two formats to yield above average ratings. The average rating by genre did not vary significantly (range 3.5-4.2) overall. Poetry has been the highest rated genre in the last 40 years (1980s - 2017, when the data stopped being captured); comic and graphic novels have decreased in popularity over 50 years. Romance and poetry have seen the most dramatic increase in user ratings during the time period analyzed whereas fanatsy/paranormal, history/biography and mystery/thriller/crime genres have remained fairly constant with regards to average ratings over 50 yeras. Children's books started and ended as the 2nd highest rated genre over 50 years but fluctuated as opposed to staying constant. Possible explanations for poetry receiving higher overall ratings consistently could be due to ascertainment bias - those who read poetry are more likely to rate a book on Goodreads as opposed to other reader populations who may like a book but aren't the type to rate it on a book application. It makes sense that month of publication may not have an influence on ratings and but length of book would. Hardcover and kindle books both scored higher as book formats which could be investigated further for underlying reasons. 


### Data Analysis/Model Creation (Ryan, Elisabeth, Julia)
Three models were created.

Initially Keras API was used to predict the average rating of a book. No clustering was observed; accuracy = 3.7 to the 4th (near 0). With help from the class instructor, we realized actual ratings are 1-5 by intervals of 0.01, and include 500 categories. We pivoted to a neural network regression model (means squared error (MSE)), rather than a categorization model. This calculates the diffeence between the predicted rating and the actual rating. It will try to minimize the total sum of squares to give us a suitable rating as the output of the predictive model.

A cosine similarity model was created in addition to the predictive model. Cosine similarity is a form of collaborative filtering and is often used within recommendation systems. A cosine similarity model is able to offer greater personalization in recommendation systems by utilizing user history and interactions. In the cosine similarity model shown within the “EJ_cosine similarity.ipynb” file, a vector is created for each title. The assessed distance (theta) between two vectors indicates similarity. The presented model has room for improvement, namely by accessing user data rather than genre data in the matrix. This improvement would allow for better, more personalized recommendations based on the data of the individual user and of other users. Where the predictive model would be used on the publisher side of the industry as an indicator for potential success, the cosine similarity model would serve the consumer to recommend new reads based on books they enjoy.


### Further improvement ideas:
Due to time constraints, author information could not be included as significant exploration, mapping and joining was needed to add author information to the existing data sets via author ID. This could be a variable to explore with regards to ratings. In addition, running the analysis on multiple iterations of random 10000 subsets to see if changes in the descriptive analyses could be observed to identify possible sampling bias may be beneficial and interesting.

In the future, if specific user data could be accessed, it could be helpful to create a simple web-based user interface to interact with the goodreads data to and receive book recommendations based on a user profile informed by their reading history, recent reads and user preferences. The output could display a list of recommended titles with cover photo, title, author, overall average rating and other information. Image URLs are available and could be pulled with each recommendations. 


### Items in Project 4
1. Jupyter Notebook python scripts
2. Visualization folder (includes images of visualizations created for the project and presentation)
3. Web folder

### References

Goodreads Book Graph Datasets: https://mengtingwan.github.io/data/goodreads.html#datasets
Cited Sources (as recommended by Goodreads)
Mengting Wan, Julian McAuley, "Item Recommendation on Monotonic Behavior Chains", in RecSys'18. 
Mengting Wan, Rishabh Misra, Ndapa Nakashole, Julian McAuley, "Fine-Grained Spoiler Detection from Large-Scale Review Corpora", in ACL'19.