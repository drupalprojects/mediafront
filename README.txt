MediaFront

In this file:
- MediaFront Resources
- Introduction to MediaFront
- Installation

NOTES
--------------------
- This guide is for the 7.x-2.x branch of the MediaFront module. 

- This guide is taken from instructions at http://www.youtube.com/watch?v=ZZ3z0ko-uRU.


MEDIAFRONT RESOURCES
--------------------

Project Page:   http://drupal.org/project/mediafront
Issue Queue:    http://drupal.org/project/issues/mediafront
Home Page:	http://www.mediafront.org/  
Documentation:  http://www.mediafront.org/documentation/ and http://drupal.org/project/mediafront


INTRODUCTION TO MEDIAFRONT
--------------------------

The MediaFront module is a front end media solution for Drupal. It employs an innovative and intuitive administration interface that allows the website administrator to completely customize the front end media experience for their users without writing any code. In addition to this amazing module is the built-in Open Standard Media (OSM) Player.

The Open Standard Media (OSM) Player is an industry changing, open source (GPLv3) media player that is written in jQuery to dynamically deliver any type of web media, including HTML5, YouTube, Vimeo, and Flash.

Use this module if you would like...
- An open source ( GPL ) and free front end media solution. With a built in jQuery media player!
- HTML5 content delivery with dynamic Flash fallback for non-standard media.
- A dynamic and integrated YouTube and Vimeo player which the same presentation to users.
- Easily themable media player using jQuery-UI ThemeRoller.
- An advanced, easy to use administrator interface for configuring your media player.
- A simple to install and configure front end media solution. Simply install the module and you are ready to go!


UPGRADING FROM 1.x to 2.x
-------------------------

There is currently no upgrade path from 1.x to 2.x. Documentation on how to upgrade is forthcoming.

Version 2.x of the MediaFront module is a major refactor and simplification on how the MediaFront module selects the correct media to play. This will not only provide a major performance boost, but also give you much finer granularity into what media the media player plays. 


INSTALLATION
------------

To install and configure MediaFront you will need to:

	1.	Install the required modules. 
        
		Modules Needed:
		MediaFront
		
		Modules Needed for Playlist Configuration:
		Views
		CTools
		
		A.  Download the latest MediaFront release. 
        
			The most recent version of the MediaFront module can be downloaded and extracted from http://drupal.org/project/mediafront. Place the entire MediaFront folder into your sites/all/modules directory or use the Drupal interface to istall this module (admin/modules).

			Go to Admin > Site Building > Modules and enable the MediaFront Module. Also enable the Open Standards Media Player listed under MediaFront: Players.
			
INITIAL CONFIGURATION
---------------------
	
	1.	Preparing Drupal for MediaFront
	
		A.	Create a new content type for media.
			1.	Go to Structure > Adminstration > Content types.
			2.	Click Add content type.
			3.	Choose a name for your new content type. You can name it "Media" or anything else. Optional: select any additional settings for this content type.
			4.	After choosing a name, hit Save and add fields.
			5.	In the Manage Fields section, add the following fields: 

				label: Media Upload
				name: media_upload
				field: file
				widget: file

				Hit Save.

				label: Image Upload
				name: image_upload
				field: image
				widget: image

				Save.
				
				(Instead of Media Upload and Image Upload, you can name the fields any name you want. You can only use a-z, 0-9, and _ for the field names.)

			6. Edit the media field settings (Media Upload). (Click Edit to the right of Media Upload.) 
			
				Set the MediaFront Settings field type to Media. Leave Media Type as Media Content.

				In allowed file extensions, add the following:
				mp4 m4v mov flv f4v ogg ogv wmv vp6 vp5 mpg avi mpeg mp3 webm

				(Or you can add: mp4, m4v, mov, flv, f4v, ogg, ogv, wmv, vp6, vp5, mpg, avi, mpeg, mp3, webm)

					[** Drupal 7 says to seperate extensions with a space or comma, but using both works fine as well, as demonstrated in the video tutorial at http://www.youtube.com/watch?v=ZZ3z0ko-uRU.]

				Optional: You can change the progress indicator to "bar with progress meter" or leave it as throbber.

				The Media Upload Field Settings remain the same.
				
				Hit Save. 

			7. Edit the Image field settings (Image Upload). (Click Edit to the right of Image Upload.) 

				Set the MediaFront Settings field type to Image. Select a preview style and thumbnail style.
				
				Mediafront Settings:
				Field Type: Image
				Preview Style: for now, we can set this to large.
				Thumbnail Style: for now, we can set this to thumbnail.

				Allowed file extensions: png, gif, jpg, jpeg
				These are the automatic settings used with an Image Field.

				Save settings.
				
			8.	Manage Display settings for your media content type.
			
				Set up the fields in this order and with these settings:
				
				Field			Label 		Format
				Body			Hidden		Default
				Image Upload	Hidden		Image
				Media Upload	Hidden		Generic File
			
				Drag Image Upload to the hidden section in the Manage Display settings.
				
				Save.
				
			9.	Add a node using you media content type. 
				
				Add a title. Upload a media file that is the adheres to the field type and size limit requirements shown. You may also add an image. Save.
	
	
CREATING AND CONFIGURING MEDIAFRONT PRESETS	
-------------------------------------------
	
	A.	Display the media player in a node
       
			1.	Go to Structure > MediaFront Presets > Add Preset
			2.	Select a name for your preset. Let's name it nodeplayer. (When selecting a name, follow the character requirements on the page.)
			3.	Add a description if you want. For Media Player, select Open Standard Media Player. Hit Next.
			4.	You will see a preview of how MediaFront will display your media content.
			5.	Go to Preset Settings > Player Settings > Playlist Settings> Display Settings. Select Disable Playlist. Save preset.
			6.	Go to Structure > Content types > Media > Manage Display. Change the format for Media Upload to MediaFromt Player. Select the rotary wheel to edit the MediaFront Presets settings. Select nodeplayer. Hit Update. Save.
			
				Media Upload
				Format: MediaFront Player
				Player Settings: preset. Change to nodeplayer. Update. 
				
				A note on fields:
				For each content type that will use MediaFront, you must be explicit with every field you want to display in MediaFront. The title is automatically brought in. If you click on edit on any other field, there is a section called MediaFront settings which will determine how a file or field is used and displayed in MediaFront. 
			
			7.	Visit a node of content type Media to see the media file and image displayed using the MediaFront module. 

			
CREATING AND CONFIGURING PLAYLISTS USING VIEWS		
----------------------------------------------
	
	How playlists are configured depends upon your implementation needs and can be adjusted as your needs change. Below are a few examples of how Views can be configured with MediaFront.
	
	1.  If you have not done so already, install Views and CTools and enable these two modules.
	
	A.	View with one large media player and built-in playlist
	
		1.	Go to Administration > Structure > Views.
		2.	Add new view. 
		3.	We will name this view "media" (though it can be named anything.) 

		*** These instructions are currently being written. ***
		
	B. View with one large media player and a Grid of files below
	
	C. View with a grid of minature media players


USING LINKS AS MEDIA CONTENT
----------------------------
	It is possible to configure MediaFront so that a video is pulled from an externally-hosted servers or from your own files. The player can also pull in streamed video content: Youtube, Vimeo, etc.

	1. Create a new content type. Go to Structure > Adminstration > Content types.
	2.	Click Add content type.
	3.	Choose a name for your new content type. You can name it "Media link" or anything else. Optional: select any additional settings you want for this content type.
	4.	After choosing a name, hit Save and add fields.
	5.	In the Manage Fields section, add the following fields: 

		label: Media URL
		name: media_url
		field: text
		widget: Text field
				
		Hit Save.

	6. In the Media link Manage Fields section, edit the Media URL settings.
			
		Set the MediaFront Settings field type to Media. Leave Media Type as Media Content.

	7.	Change the Manage Display settings for Media link.
			
		Set up the fields in this order and with these settings:
				
		Field			Label 		Format
		Body			Hidden		Default
		Media URL		Hidden		MediaFront Player
			
		In the Media URL player settings, set the MediaFront preset to nodeplayer. Hit Update. Hit save.
				
	8.	Add a node using this new content type. 
		
		Go to Content > Add Content > Media link.
		
		Add a title. In the Media URL field, paste the url to a video. This link can be a streamed video or a video file hosted on a a server. Hit Save.
				
	9.	(Optional) If you want to create a separate preset for Media links, you can follow these steps. Create a preset to display url videos.
       
			1.	Go to Structure > MediaFront Presets > Add Preset
			2.	Select a name for your preset. Let's name it urlplayer. (When selecting a name, follow the character requirements on the page.)
			3.	Add a description if you want. For Media Player, select Open Standard Media Player. Hit Next.
			4.	You will see a preview of how MediaFront will display your media content.
			5.	Go to Preset Settings > Player Settings > Playlist Settings> Display Settings. Select Disable Playlist. Save preset.
			6.	Go to Structure > Content types > Media link > Manage Display. Change the format for Media URL to MediaFromt Player. Select the rotary wheel to edit the MediaFront Presets settings. Select nodeplayer. Hit Update. Save.
			
				Media Upload
				Format: MediaFront Player
				Player Settings: preset. Change to urlplayer. 
				
				Update. Hit Save.
				
				
FILE FORMATS
------------
	(supported file formats, how to encode video correctly so it works with MediaFront)
	
	[** An updated list of confirmed supported file formats will need to be added. Also add troubleshooting information for file formats that need to be configured in a certain way to work with the media player.]
	
	A.	MPEG/ MPG

	B.	OGG
		[-seems to work just fine.]
	
	
URLS
----
	(supported sites and hosted video types)
	
	A. Youtube
	
		To copy a paste a Youtube link, you will need the simple form of the link. For example:
		
		- http://www.youtube.com/watch?v=k7tbGXjMRWQ works fine.
		- http://youtu.be/k7tbGXjMRWQ does not work. Error shown: "Cannot play media: unknown."
		- www.youtube.com/watch?v=k7tbGXjMRWQ does not work. Error shown: "Cannot play media: unknown."
		
		Videos with hyphens in their name throw the following error: "An error occured. Please try again later."
		Example: http://www.youtube.com/watch?v=ZZ3z0ko-uRU
		
	B. Links of Video Files
	
		[Confirmed that this workd for an flv file from an external server.]
	
THEME CONFIGURATION
-------------------
	(custom themes)
	