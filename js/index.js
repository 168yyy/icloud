var reminder = angular.module('reminder',[]);
reminder.controller('ctrl', ['$scope', function($scope){
	$scope.color = ['purple','green','blue','yellow','brown','pink','orange'];
	$scope.lists = localStorage.data?JSON.parse(localStorage.data):[];
	$scope.currentIndex = 0;
	$scope.currentEvent = $scope.lists[0];
	$scope.event = function(index){
		$scope.currentEvent = $scope.lists[index];
		$scope.currentIndex = index;
	}
	$scope.colorBorder = false;
	$scope.add = function(){
		var data = {
		name:'新列表 ' + ($scope.lists.length + 1),
		color:$scope.color[$scope.lists.length%7],
		items:[]
		};
		$scope.lists.push(data);
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.save = function(){
		localStorage.data = JSON.stringify($scope.lists);
		//清除本地缓存
		//localStorage.clear();
	}
	$scope.del = function(){
		var newlist = [];
		for(var i = 0;i < $scope.lists.length;i++){
			if(i != $scope.currentIndex){
				newlist.push($scope.lists[i]);
			}
		}
		$scope.lists = newlist;
		$scope.currentIndex = 0;
		$scope.currentEvent = $scope.lists[0];
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.flag = false;
	$scope.sele = function(){
		$scope.flag = !$scope.flag;
	}
	$scope.willDo = function(){
		var eventList = $scope.lists[$scope.currentIndex];
		var data = {name:'新条目' + (eventList.items.length+1),isDone:false,hs:false};
		eventList.items.push(data);
		$scope.lists[$scope.currentIndex] = eventList;
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.delEvent = function(index){
		var eventList = $scope.lists[$scope.currentIndex];
		var newlist = [];
		for(var i = 0;i < eventList.items.length;i++){
			if(i != index){
				newlist.push(eventList.items[i]);
			}
		}
		eventList.items = newlist;
		$scope.lists[$scope.currentIndex] = eventList;
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.hideShow = function(index){
		var eventList = $scope.lists[$scope.currentIndex];
		for(var i = 0;i < eventList.items.length;i++){
			if(i == index){
				eventList.items[i].hs = true;
			}else{
				eventList.items[i].hs = false;
			}
		}
		$scope.lists[$scope.currentIndex] = eventList;
	}
}])

//自适应
window.onresize = function(){
	var list = document.querySelector('.list');
	var reminder = document.querySelector('.reminder');
	var wid = list.offsetWidth;
	reminder.style.left = wid + 'px';
	list.style.bottom = 0;
}
window.onresize();