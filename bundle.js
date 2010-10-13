
function Bundle() {
	this._funcs = Array.prototype.slice.call(this,arguments,0);
	this._executing = false;
}

Bundle.prototype = {

	_isExecuting: function() {
		if(this._executing == true) {
			throw "bundle is immutable once execute is called";
		}
	},

	add: function(func) {
		this._isExecuting();
		this._funcs.push(func);
	},

	execute: function(callback) {
		
		this._isExecuting();
		
		var self = this;
		
		this._executing = true;
		
		var returned = 0;
		var errored = false;
		
		function completeCallback(error) {
			if(errored==true) {
				return;
			}
			returned++;
			if(error) {
				errored = true;
				callback(error);
			} else {
				if(returned == self._funcs.length) {
					callback();
				}
			}			
		}
		
		this._funcs.forEach(function(func, index) {
			func(completeCallback);
		});

	}

}

exports.Bundle = Bundle;