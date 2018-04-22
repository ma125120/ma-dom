var animate = function({ el, attr, start=0, end=200, times=300, timeDiff=30 } = {}) {
      var 
          start = parseInt(start) || parseInt(document.defaultView.getComputedStyle(el, null)[attr]);
      //el.style.position = 'absolute';

      var requestAnimation = function({ el, attr, start, end, times, timeDiff }) {
        var start_time,
            finalDiff = Math.abs(end-start),
            tid;
        function step(timestamp) {
          if (!start_time) start_time = timestamp;
          var progress = (timestamp - start_time)/times,
              value = (start < end) ? (Math.min( start + progress * finalDiff, end) + 'px') : ((start - progress * finalDiff) + 'px');
          el.style[attr] = value;
          if (isStop({ el, attr, start, end })) {
            window.cancelAnimationFrame(tid)
          } else {
            tid = window.requestAnimationFrame(step);
          }
        }

        tid = window.requestAnimationFrame(step);
      }
      var requestInterval = function({ el, attr, start, end, times, timeDiff }) {
        var finalDiff = Math.abs(end-start),
            count = times/timeDiff,
            per = finalDiff/count,
            i = 0,
            tid;

        tid = setInterval(()=>{
          var value = (start < end) ? (Math.min(start + per*i, end) + 'px') : (Math.max(start - per*i, end) + 'px');
          el.style[attr] = value;
          i++;

          if(isStop({ el, attr, start, end })) {
            clearInterval(tid);
          }
        },timeDiff)
      }

      var isStop = function({ el, attr, start, end }) {
        var now = parseInt(el.style[attr]),
            result = (start < end)?(now > end):(now < end);

        return result;
      }

      if(window.requestAnimationFrame) {
        requestAnimation({ el, attr, start, end, times, timeDiff });
      } else {
        requestInterval({ el, attr, start, end, times, timeDiff });
      }
  
};

export {
  animate
}