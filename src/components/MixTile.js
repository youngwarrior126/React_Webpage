import React from 'react';
import constants from '../constants/constants';
import {History} from 'react-router';

var MixTile = React.createClass({

	mixins: [History],
	openMixPage() {
		var routePath = this.props.event.split(' ').join('-');

		this.history.pushState(null, '/mix/' + routePath);
	},
	render() {
		var image = constants.S3_ROOT_FOR_IMAGES + this.props.imageURL;

		return (
			<div className='mix-tile flex-column click'onClick={this.openMixPage}>
				<img src={constants.S3_ROOT_FOR_IMAGES + this.props.imageURL}/>
				<span className='mix center'>{this.props.event}</span>
			</div>
		);
	}

});

module.exports = MixTile;