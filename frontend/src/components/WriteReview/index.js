import React from "react";
import ReviewField from './../ReviewField'

class WriteReview extends React.Component{

	render() {
		return(
			
			<div className="writeReview">
				<ReviewField user={this.props.user}/>
			</div>
		
		
		
		)

	}
}
export default WriteReview;