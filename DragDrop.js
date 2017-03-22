var DragDrop = function(){
	var dragdrop = new EventTarget(),
	    dragging = null,
	    diffx = 0,
	    diffy = 0;
	
	function handleEvent(event){
		//获取事件和对象
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//确定事件类型
		switch(event.type){
			case "mousedown":
			    if(target.className.indexOf("draggable") > -1){
			    	dragging = target;
			    	diffx = event.clientX - target.offsetLeft;
			    	diffy = event.clientY - target.offsetTop;
			    	//触发自定义事件
			    	dragdrop.fire({type: "dragstart", target: dragging, x: clientX, y: clientY});
			    }
			    break;
			case "mousemove":
			    if(dragging !== "null"){
			    	//指定位置
			    	dragging.style.left = (event.clientX - diffx) + "px";
			    	dragging.style.top = (event.clientY - diffy) + "px";
			    	//触发自定义事件
			    	dragdrop.fire({type: "dragstart", target: dragging, x: clientX, y: clientY});
			    }
			    break;
			case "mouseup":
			    dragdrop.fire({type: "dragstart", target: dragging, x: clientX, y: clientY});
			    dragging = null;
			    break;
		}
	};
	//公共接口
	dragdrop.enable = function(){
		EventUtil.addHandler(document, "mousedown", handleEvent);
		EventUtil.addHandler(document, "mousemove", handleEvent);
		EventUtil.addHandler(document, "mouseup", handleEvent);
	}
	dragdrop.disable = function(){
		EventUtil.addHandler(document, "mousedown", handleEvent);
		EventUtil.addHandler(document, "mousemove", handleEvent);
		EventUtil.addHandler(document, "mouseup", handleEvent);
	}
	return dragdrop;
}();
