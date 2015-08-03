var React = require('react')
var constants = require('./constants/constants.js')
var todoStore = require('./stores/mainStore');
var todoActions = require('./actions/mainActions');

var SetTile = require('./components/SetTile')
var TrackTile = require('./components/TrackTile')
var EventTile = require('./components/EventTile')

var Player = require('./components/Player')
var Footer = require('./components/Footer')
var Buffer = require('./components/Buffer')

var FeaturedView = require('./components/FeaturedView')
var BrowseView = require('./components/BrowseView')

var App = React.createClass({
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<LandingView type={this.props.type} />
				<Footer />
			</div>
		);
	}
})
	
//detail page

	var DetailView = React.createClass({
		getInitialState: function() {
			return {
				data: [],
				pageType: null 
			};
		},
		render: function() {
			//TEST determine if artist or event detail
			var detailType = 'artist'; // state
			if(detailType == 'artist') {
				title = this.props.detailData.artist
				button_text = "Follow"
				info = this.props.detailData.set_count + " sets | " + this.props.detailData.event_count + " events"
				imageURL = this.props.detailData.imageURL
				navTitles = ["sets","events"]
			} else {
				title = this.props.detailData.event
				button_text = "Tickets"
				
				info = this.props.detailData.start_date + " - " + this.props.detailData.end_date

				imageURL = this.props.detailData.main_eventimageURL
				navTitles = ["lineup"]
			}
			content = this.props.detailData
			var links = [
				{
					type: 'facebook',
					url: this.props.detailData.fb_link
				},
				{
					type: 'twitter',
					url: this.props.detailData.twitter_link
				},
				{
					type: 'instagram',
					url: this.props.detailData.instagram_link
				},
				{
					type: 'soundcloud',
					url: this.props.detailData.soundcloud_link
				},
				{
					type: 'youtube',
					url: this.props.detailData.youtube_link
				},
				{
					type: 'web',
					url: this.props.detailData.web_link
				}
			]
			console.log(this.props.detailData)
			console.log(links)
			return (
				<div id="detail" className="view detail-page">
					<DetailImageContainer title={title} button_text={button_text} imageURL={imageURL} info={info} />
					<LinkButtonsContainer links={links} />
					<div className="divider"></div>
					<DetailContentContainer navTitles={navTitles} content={content}/>
				</div>
			);
		}
	});

	var DetailImageContainer = React.createClass({	// Displays key detail information
		render: function() {
			return (
				<div className="flex-column flex image-container overlay-container" style={{background: "url('" + S3_ROOT_FOR_IMAGES + imageURL + "')"}}>
                    <div className="overlay"></div>
                    <div className="buffer"></div>
                    <div className="header center artist-name">{title}</div>
                    <div className="header-small center">{info}</div>
                    <div className="buffer"></div>
                    <div className="header-small center click" id="detail-button">{button_text}</div>
                    <div className="buffer"></div>
                </div>
			);
		}
	});

	var LinkButtonsContainer = React.createClass({	// Displays links in a row
		render: function() {
			var linkItems = []
			for(var i in this.props.links) {

			}
			this.props.links.map(function(link) {
				linkItems.push(<LinkButton type={link.type} url={link.url}/>)
			})
			return (
				<div className="flex-row links-container">{linkItems}</div>
			);
		}
	});

	var LinkButton = React.createClass({ // Displays a button to an external link
		render: function() {
			return (
				<a href={this.props.url}><i className={'fa fa-fw fa-2x click fa-'+this.props.type}></i></a>
			);
		}
	})

	var DetailContentContainer = React.createClass({	// Displays the titles of a results container
		render: function() {
			return (
				<div>
					<DetailNavContainer navTitles={this.props.navTitles} />
					<DetailContent content={this.props.content} />
				</div>
			);
		}
	})

	var DetailNavContainer = React.createClass({	// Displays the titles of a results container
		render: function() {
			var titles = []
			this.props.navTitles.map(function(navTitle) {
				titles.push(<DetailNavButton title={navTitle} />)
			})
			return (
				<div className="flex-row links-container">{titles}</div>
			);
		}
	})

	var DetailNavButton = React.createClass({ // Changes the results of a container
		render: function() {
			return (
				<div className={'center click flex-fixed '+this.props.title}>
					{this.props.title}
				</div>
			);
		}
	})

	var DetailContent = React.createClass({	// Displays a tile for each detail set, lineup, or event
		render: function() {
			var tiles = []
			// if(true) {
			// 	this.props.content.sets.forEach(function(contentItem) {
			// 		tiles.push(<SetTile/>) // Set tiles
			// 	});
			// } else if(true) {
			// 	this.props.content.upcomingEvents.forEach(function(contentItem) {
			// 		tiles.push(<EventTile/>) // Event tiles
			// 	});
			// } else {
			// 	this.props.content.lineup.forEach(function(contentItem) {
			// 		tiles.push(<BrowseTile/>) // Browse tiles
			// 	});
			// }
			
			return (
				<div className="results-container flex-row flex">
					{tiles}
				</div>
			);
		}
	})

//activity tile

	// var ActivityTile = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>
	// 				<div className="activity-tile flex-column overlay-container" style={{background: "url('" + S3_ROOT_FOR_IMAGES + this.props.activity.imageURL + "')"}}>
	// 				<div className="activity-tile flex-column overlay-container">
	// 				    <div className="overlay"></div>
	// 				    <div className="flex-row flex-3x">
	// 				        <i className="fa fa-fw fa-random center click"></i>
	// 				        <i className="fa fa-4x center"></i>
	// 				        <i className="fa fa-fw fa-bars center click"></i>
	// 				    </div>
	// 				    <div className="set-flex flex actvity-name center">{this.props.activity.activity}</div>
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// });

//browse tile
	
	var BrowseTile = React.createClass({
		render: function() {
			return (
				<div className="browse-tile flex-column overlay-container click view-trigger">
				    <div className="overlay">
				        <div className="browse-name center">{this.props.name}</div>
				    </div>
				    <img className="browse-tile-image" src={S3_ROOT_FOR_IMAGES + this.props.object.imageURL} />
				</div>
			);
		}
	
	});

//featured vi

//Header

	var Header = React.createClass({
		render: function() {
			return (
				<header className="flex-row flex-zero">
					<MenuController />
		            <i className="nav-button fa icon-setmine fa-2x click center flex-zero" title="Setmine Home"></i>
		            <Buffer/>
		            <SearchBar />
		            <Buffer/>
		            <LoginButton />
		        </header>
			);
		}
	});

	var MenuController = React.createClass({
		render: function() {
			<i className="nav-button fa fa-bars click center nav-toggle flex-zero"></i>
		}
	})

	var LoginButton = React.createClass({
		render: function() {
			return (
				// <div className="nav-button click center login" id="login">{loginAction}</div>
				<div className="nav-button click center login" id="login">Login</div>
			);
		}
	});

	var SearchBar = React.createClass({
		getInitialState: function() {
			return {
				searchInput: ''
			};
		},
		search: function(query) {
			var results = null;
			$(".search-loader").removeClass("hidden")
			$(".search-loader").removeClass("hidden-fade")
			if(activeSearchAjax != null) {
				activeSearchAjax.abort();
				activeSearchAjax = null;
			}
			activeSearchAjax = $.ajax({
				type: "GET",
				url: API_ROOT + "search/" + query,
				success: function(response) {
					console.log(response)
					if(response.status == "success") {
						results = response.payload.search;
						spliceBigArray(results.sets)
						spliceBigArray(results.upcomingEvents)
						spliceBigArray(results.tracks)
						
						var allResults = 0;

						$('.search-results .search-section').empty();

						// Generate search containers

						var setsContainer = $(".search-results .search-section.sets");
						setsContainer.parents(".search-results-container").find(".item-number.sets").text(results.sets.length);
						var uEventsContainer= $(".search-results .search-section.upcoming-events");
						uEventsContainer.parents(".search-results-container").find(".item-number.upcoming-events").text(results.upcomingEvents.length);
						var tracksContainer = $(".search-results .search-section.tracks");
						tracksContainer.parents(".search-results-container").find(".item-number.tracks").text(results.tracks.length);

						// Populate search containers

						for(var s in results.sets) {
							createSetTile(results.sets[s], setsContainer);
							allResults++
							if(allResults == (results.sets.length + results.upcomingEvents.length + results.tracks.length)) {
								displaySearchSections()
							}
						}
						for(var u in results.upcomingEvents) {
							createUpcomingEventTile(results.upcomingEvents[u], uEventsContainer);
							allResults++
							if(allResults == (results.sets.length + results.upcomingEvents.length + results.tracks.length)) {
								displaySearchSections()
							}
						}
						for(var t in results.tracks) {
							createTrackTile(results.tracks[t], tracksContainer);
							allResults++
							if(allResults == (results.sets.length + results.upcomingEvents.length + results.tracks.length)) {
								displaySearchSections()
							}
						}
					} else {
						results = null;
					}
				}
			});
		},
		handleChange: function(e) {
			this.setState({
				searchInput: e.target.value
			});
			search();
		},
		render: function() {
			return (
				<div className="search-bar flex-row flex">
					<i className="nav-button fa fa-search center click flex-zero"></i>
	                <input id="search" className="nav-button flex" placeholder="search an artist, festival, radio mix or track" value={this.state.searchInput} onChange={this.handleChange} />
	            </div>
			);
		}
	})

	var NavMenu = React.createClass({
		getInitialState: function() {
			return {
				focused: 0,
				hidden: true
			};
		},
		clicked: function(index) {
			this.setState({
				focused: index 
			});
		},
		render: function() {
			if(this.state.hidden) {
				var style = {
					display: 'none'
				};
			} else {
				var style = undefined;
			}
			return (
				<div id="nav-menu" className='flex-column' style={style}>
					{this.props.items.map(function(m, index){
						return <div className='nav-list-item click flex flex-row' onClick={this.clicked.bind(this, index)}>{m}</div>
					})}
				</div>
			);
		}
	})

//home view

	var HomeView = React.createClass({
		render: function() {
			return (
				<div id="home" className="view flex-row overlay-container hidden">
					<HomeSidebar />
					<HomeResultsContainer />
				</div>
			);
		}
	});

	var HomeSidebar = React.createClass({
		render: function() {
			return (
				<div className="flex-column flex-fixed sidebar">
                    <div className="flex flex-column overlay-container user-background">
                        <img className="user-image center" src="images/userImage.jpg" />
                    </div>
                    <div className="flex-2x flex-column user-nav">
                        <div className="view-trigger click flex flex-row active" name="my-sets">
                            <div>My Sets</div>
                        </div>
                        <div className="view-trigger click flex flex-row" name="new">
                            <div>New</div>
                        </div>
                        <div className="view-trigger click flex flex-row" name="activities">
                            <div>Activities</div>
                        </div>
                    </div>
                </div>
			);
		}
	});

	var HomeResultsContainer = React.createClass({
		render: function() {
			return (
				<div className="flex-row flex-fixed-3x results-container"></div>
			);
		}
	});

//landing view

	var LandingView = React.createClass({
		render: function() {
			return (
				<div id="landing" className="flex-column view flex">
					<LandingHome />
					<LandingApp />
					<LandingEvents />
				</div>
			);
		}
	});
	
	var LandingHome = React.createClass({
		scroll: function() {
			setTimeout(function(){
				$(window).scrollTo($('#landing-2'), 400, {
					offset: - $('header').height()
				});
			}, 200);
		},
		render: function() {
			return (
				<div className="flex-column overlay-container landing-view" id="landing-1">
                    <div className="overlay"></div>
                    <div className="buffer"></div>
                    <div className="header center wow zoomIn">Setmine</div>
                    <div className="center wow zoomIn">Relive your favorite events</div>
                    <div className="buffer"></div>
                    <div className="flex-row center">
                        <a href="http://bit.ly/SetmineiOS" title="view on App Store" className="fa fa-apple fa-fw fa-4x wow fadeInLeft click"></a>
                        <a href="http://bit.ly/SetmineAndroid" title="view on Google Play"className="fa fa-android fa-fw fa-4x wow fadeInRight click"></a>
                    </div>
                    <div className="buffer-5x"></div>
                    <div className="header-small nav-button center click wow fadeInUp" id="listen-now">Listen Now</div>
                    <div className="buffer"></div>
                    <i className="fa fa-chevron-down center click wow slideInUp" onClick={this.scroll}></i>
                    <div className="buffer"></div>
                </div>
			);
		}
	});

	var LandingApp = React.createClass({
		render: function() {
			return (
				<div className="flex-column landing-view overlay-container" id="landing-2">
                    <div className="flex-row overlay-container slide slide-1 hidden">
                        <div className="flex-column flex-fixed text-container">
                            <div className="buffer"></div>
                            <div className="header-medium center wow bounceInLeft">Unlock exclusive content from your favorite artists</div>
                            <div className="buffer"></div>
                            <div className="center wow bounceInLeft">
                                {'We\'re no strangers to love'}
                            </div>
                            <div className="buffer-5x"></div>
                        </div>
                        <div className="flex-column flex-fixed image-container">
                            <img className="center wow slideInUp" src="images/slide-2.jpg" />
                        </div>
                    </div>
                    <div className="flex-row overlay-container slide slide-2 hidden">
                        <div className="flex-column flex-fixed text-container">
                            <div className="buffer"></div>
                            <div className="header-medium center animated bounceInLeft">Say goodbye to missing a live performance</div>
                            <div className="buffer"></div>
                            <div className="center animated bounceInLeft">{'Setmine lets you listen any live set or recorded mix completely free, allowing you to relive your favorite events, or catch up on the ones you missed.'}</div>
                            <div className="buffer-5x"></div>
                        </div>
                        <div className="flex-column flex-fixed image-container">
                            <img className="center animated slideInUp" src="images/slide-2.jpg" />
                        </div>
                    </div>
                    <div className="flex-row overlay-container slide slide-3">
                        <div className="flex-column flex-fixed text-container">
                            <div className="buffer"></div>
                            <div className="header-medium center animated bounceInLeft">See which song is playing with interactive tracklists</div>
                            <div className="buffer"></div>
                            <div className="center animated bounceInLeft">{'Search for your favorite tracks and hear the results in live set form. We\'ll fast-forward you right where the artist drops the track'}</div>
                            <div className="buffer-5x"></div>
                        </div>
                        <div className="flex-column flex-fixed image-container">
                            <img className="center animated fadeIn" src="images/slide-3.jpg" />
                        </div>
                    </div>
                    <div className="flex-row overlay-container slide slide-4 hidden">
                        <div className="flex-column flex-fixed text-container">
                            <div className="buffer"></div>
                            <div className="animated bounceInLeft">Setmine's Activities feature makes it easy to find the perfect set for whatever you're doing.</div>
                            <div className="buffer"></div>
                            <div className="animated bounceInLeft">Get pumped to workout to Skrillex. Relax and chill with Kygo and Thomas Jack. Zone into a study sesh with Above & Beyond.</div>
                            <div className="buffer"></div>
                            <div className="divider center animated zoomIn"></div>
                            <div className="buffer"></div>
                            <div className="animated bounceInLeft">Save your favorite sets for quick and easy listening with My Sets</div>
                            <div className="buffer"></div>
                            <div className="animated bounceInLeft">You can enjoy these features with a quick one-time facebook login.</div>
                            <div className="buffer"></div>
                        </div>
                        <div className="flex-column flex-fixed image-container">
                            <img className="center animated slideInUp" src="images/slide-4.jpg" />
                        </div>
                    </div>
                    <LandingSlideControls />
                </div>
			);
		}
	});

	var LandingSlideControls = React.createClass({
		getInitialState: function() {
			return {
				active: true
			}
		},
		transitionSlide: function() {
			console.log('bruh');
		},
		render: function() {
			return (
				<div className="flex-row slide-controls">
                    <LandingSlideButton />
                    <LandingSlideButton />
                    <LandingSlideButton />
                    <LandingSlideButton />
                </div>
			);
		}
	})

	var LandingSlideButton = React.createClass({
		getInitialState: function() {
			return {
				active: false,
				icon: "fa fa-fw click fa-circle-o"
			};
		},
		activeSlide: function() {
			this.setState({
				active: !this.state.active,
				icon: this.state.active ? "fa fa-fw click fa-circle" : "fa fa-fw click fa-circle-o"
			});
		},
		render: function() {
			return (
				<i className={this.state.icon} onClick={this.activeSlide}></i>
			);
		}
	})

	var LandingEvents = React.createClass({
		render: function() {
			return (
				<div className="flex-column landing-view" id="landing-3">
                    <div className="flex-column flex-3x image-container overlay-container">
                        <div className="overlay"></div>
                        <div className="header-medium wow bounceInLeft">Discover upcoming events near you.</div>
                    </div>
                    <div className="flex-column flex text-container">
                        <div className="buffer"></div>
                        <div className="wow fadeInUp">Our streamlined event discovery feature allows you to find local events, view lineups, and purchase tickets within the app.</div>
                        <div className="buffer"></div>
                        <div className="divider center wow zoomIn"></div>
                        <div className="buffer"></div>
                        <div className="wow fadeInUp">You can see whos playing around the world, or in your hometown.</div>
                        <div className="buffer"></div>
                    </div>
                </div>
			);
		}
	});

//search view

	var SearchResultsView = React.createClass({
		getInitialState: function() {
			return {
				type: 'sets' 
			};
		},
		render: function() {
			return (
				<div id="search-results" className="view overlay-container hidden">
	                <div className="flex-row view-title-container sets">
	                    <div className="view-title sets results-filter flex set-flex">
	                        <div className="center">Sets</div>
	                    </div>
	                    <div className="view-title events results-filter flex set-flex">
	                        <div className="center">Events</div>
	                    </div>
	                    <div className="view-title tracks results-filter flex set-flex">
	                        <div className="center">Tracks</div>
	                    </div>
	                    <div className="divider"></div>
	                </div>
	                <div className="search-results"></div>
	            </div>
			);
		}
	});

	

//main view controller
	var MainViewController = React.createClass({
		render: function() {
			return (
				<div id="main-container">
					<LandingView />
					<SearchResultsView />
					<BrowseView />
					<HomeView />
					<FeaturedView />
					<DetailView data={this.props.data} />
				</div>
			);
		}
	});

//top level component container
	var Content = React.createClass({
		render: function() {
			return (
				<div id="content">
					<Header />
					<NavMenu items={['Home', 'Sets', 'Upcoming', 'Artists', 'Festivals', 'Mixes', 'Genres']} />
					<MainViewController data={this.props.data} />
					<Player />
					<Footer />
				</div>
			);
		}
	});

//testing environment

	var TestView = React.createClass({
		render: function() {
			return (
				<div className="flex-row flex">
					<SetTile data={this.props.data} />
				</div>
			);
		}
	});

React.render(<App/>, document.getElementById('app'));