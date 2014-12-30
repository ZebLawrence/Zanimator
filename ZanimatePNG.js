(function ( $ ) {
 /*

 Zanimate PNG sprite by Zeb Lawrence

 */
    $.fn.animatePNG = function( options ) {
		var _self = this;
		this._containerElement = this;
		this._imgContainer = this.find('img');
		this.clearInterval = window.clearInterval;

		//Set defaults
        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white",
			frameHeight: _self.height(),
			frameWidth: _self.width(),
			frameRate: 60,
			intervalTime: 41.6667,
			imageContainerHeight: _self._imgContainer.height()

        }, options );
		
		this._intervalTime = (1/settings.frameRate)*1000;
		this.totalFrames = settings.imageContainerHeight/settings.frameHeight;

		console.log('this is the number of frames');
		console.log(this.totalFrames);


		this.PlayFWD = function () {	

			var startAtpx = _self._imgContainer.css('top').replace('px','');
			var endAtpx = (_self._imgContainer.height()-settings.frameHeight)*-1;
			var moveBy = settings.frameHeight;
			var currentPosition = 0;
			window.clearInterval(_self.PNGintervalListener);

			_self.PNGintervalListener = window.setInterval(function () {
				var currentOffset = _self._imgContainer.css('top').replace('px','');
				var amountToMove = currentOffset - moveBy;
				currentPosition = currentOffset;
				if (currentPosition!=endAtpx) {
					_self._imgContainer.css({'top':amountToMove});
				}
				if (currentPosition==endAtpx) {
					window.clearInterval(_self.PNGintervalListener);
					_self._imgContainer.css({'top':currentPosition});
				}

			}, _self._intervalTime);

		};

		this.PlayREV = function () {
			var startAtpx = _self._imgContainer.css('top').replace('px','');
			var endAtpx = 0;
			var moveBy = settings.frameHeight;
			var currentPosition = 0;
			window.clearInterval(_self.PNGintervalListener);

			_self.PNGintervalListener = window.setInterval(function () {
				var currentOffset = _self._imgContainer.css('top').replace('px','');
				var amountToMove = (Math.abs(currentOffset)*-1) + moveBy;
				currentPosition = currentOffset;
				if (currentPosition!=endAtpx) {
					_self._imgContainer.css({'top':amountToMove});
				}

				if (currentPosition==endAtpx) {
					window.clearInterval(_self.PNGintervalListener);
					_self._imgContainer.css({'top':currentPosition});
				}
			}, _self._intervalTime);
		};

		this.Loop = function (loops) {
			var timesPlayed = 1;
			var timesToPlay = loops;
			var startAtpx = _self._imgContainer.css('top').replace('px','');
			var endAtpx = (_self._imgContainer.height()-settings.frameHeight)*-1;
			var moveBy = settings.frameHeight;
			var currentPosition = 0;

			if (loops) {
				window.clearInterval(_self.PNGintervalListener);
				_self.PNGintervalListener = window.setInterval(function () {
					var currentOffset = _self._imgContainer.css('top').replace('px','');
					var amountToMove = currentOffset - moveBy;
					currentPosition = currentOffset;
					if (currentPosition!=endAtpx) {
						_self._imgContainer.css({'top':amountToMove});
					}
					if (currentPosition==endAtpx) {
						currentPosition = 0;
						_self._imgContainer.css({'top':currentPosition});

						if (timesPlayed == timesToPlay) {
							window.clearInterval(_self.PNGintervalListener);
							timesPlayed=0;
							_self._imgContainer.css({'top':'0px'});
						}
						else {
							timesPlayed++;
						}
					}
				}, _self._intervalTime);
			}
			else {
				window.clearInterval(_self.PNGintervalListener);
				_self.PNGintervalListener = window.setInterval(function () {
					var currentOffset = _self._imgContainer.css('top').replace('px','');
					var amountToMove = currentOffset - moveBy;
					currentPosition = currentOffset;
					if (currentPosition!=endAtpx) {
						_self._imgContainer.css({'top':amountToMove});
					}
					if (currentPosition==endAtpx) {
						currentPosition = 0;
						_self._imgContainer.css({'top':currentPosition});
					}
				}, _self._intervalTime);
			}
		};

		this.Pause = function () {
			window.clearInterval(_self.PNGintervalListener);
		};
		return this;
    };
 
}( jQuery ));