

adjList = [
    [{node: 6, weight: 1}],                                             // 0
    [{node: 2, weight: 2}, {node: 3, weight: 1}, {node: 6, weight: 2}], // 1
    [{node: 5, weight: 3}],                                             // 2
    [{node: 1, weight: 1}, {node: 4, weight: 1}],                       // 3
    [{node: 3, weight: 1}, {node: 7, weight: 1}],                       // 4
    [{node: 7, weight: 4}],                                             // 5
    [{node: 5, weight: 8}, {node: 8, weight: 6}, {node: 1, weight: 2}], // 6
    [{node: 8, weight: 2}],                                             // 7
    [{node: 7, weight: 2}],                                             // 8
  ]
  
  //This is our Priority Queue. This Priority Queue is used to keep track of what we need to visit and what we are visiting next.
  function PQ() {
    this.arr = []
    //This function is used to check if the Priority Queue is empty or not.
    this.isEmpty = function() {
      return this.arr.length ? false : true
    }
    //This function is used to insert a node to the Priority Queue
    this.insert = function(node) {
      this.arr.push(node)
    }
    //This function is used to remove the node that will be visited next. 
      //The function is using a for loop to compare the first node in the array with all of the other nodes. In the case that there is a node with a shorter distance than the first node, the node with the shortest distance becomes the minimum value and is then removed from the queue and returned 
    this.removeMin = function() {
      var min = 0;
      for(var i = 0; i < this.arr.length; i++) {
        if(this.arr[min].distance > this.arr[i].distance) {  
          min = i
        }
      }
      var node = this.arr[min]
      this.arr.splice(min, 1)
      return node;
    }
  }
  
  //This function is used to find the shortest path in an adjacency list
  function ShortestPaths(adjList, source) {
    //Goal is to find minimum distance between the source node and all other nodes using a weighted graph
  
    //Keep track of where we currently are
    var current = source;
  
    //Use Array to store distance values between source node and all other nodes
    var DistanceArr = [];
  
    //Initializing our Priority Queue
    var visitNext = new PQ()
  
    
    visitNext.insert({node: source, distance: 0})
  
    //initialize the value of each index in the distance array to 0. In the event of an unreachable node, the distance will be 0
    for (var k = 0; k < adjList.length; k++) {
        DistanceArr[k] = Infinity; // Infinity / Unreachable
    }
  
    //Initializing the source' distance to 0
    DistanceArr[source] = 0;
  
    //While loop continues as long as there is something in visitNext
    while (!visitNext.isEmpty()) {
        //Pull the next node to visit from the visitNext structure
        current = visitNext.removeMin()
  
        //Loop through all of current's edges
        for (var i = 0; i < adjList[current.node].length; i++) {
  
            var distanceToNext = DistanceArr[current.node] + adjList[current.node][i].weight;
            // Only update DistanceArr if the distance is less than what is already in there
            if(distanceToNext < DistanceArr[adjList[current.node][i].node] ){
                DistanceArr[adjList[current.node][i].node] = distanceToNext;
                visitNext.insert({node: adjList[current.node][i].node, distance: DistanceArr[adjList[current.node][i].node]}); //*
            }
          
        }
      
    }
    return DistanceArr;
  
  }
  
  console.log(ShortestPaths(adjList, 6))