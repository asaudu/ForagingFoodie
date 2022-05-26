import IndividualPost from "../components/IndividualPost";
import Form from "../components/form";
import KoreaPostList from "../components/KoreaPostList";
import { useState } from "react";

const Korea = () => {
	const [selected, setSelected] = useState(null);
  
	function passingSelected(post) {
	  //console.log('hello')
	  setSelected(post);
	  console.log("post dallas check", post);
	}
  
	let switchDisplayView;
  
	if (selected != null) {
	  switchDisplayView = (
		<div>
		  <IndividualPost post={selected} />
		  
		  <button style={{ borderRadius: "8px", boxShadow: "0 2px #ff66b3", color: "#ff66b3" }} onClick={() => setSelected(null)}>Go Back</button>
		</div>
	  );
	} else {
	  switchDisplayView = (
		<div>
		  <Form header={"Korea Ventures Heeere"} location={"Gunsan, South Korea"}/>
		  <KoreaPostList passingSelected={passingSelected} />
		</div>
	  );
	}
  
	return <div>{switchDisplayView}</div>;
};

export default Korea;
