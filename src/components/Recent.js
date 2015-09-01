import React from 'react';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Recent';
var TYPE = 'set';
var Recent = React.createClass({

	componentWillMount: function() {
		 this.getRecentSets();
	},
	getRecentSets: function() {
		var push = this.props.push;
		console.log(push);
		var results,
			recentUrl = constants.API_ROOT + 'recent';

		$.ajax({
			url: recentUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.recent;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					recentBrowseData: results
				}
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('recentBrowseData');
		var push = this.props.push;
		var setClass = 'flex-row flex-fixed-4x scrollable';
		
		return (
			<SetContainer
				push={push}
				data={data}
				setClass={setClass}/>
		);
	}

});

module.exports = Recent;