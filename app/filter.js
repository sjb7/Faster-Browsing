export default function tabFilterMain(scorer) {
	return function(query, array) {
    	return array.map(function(item) {
      		var titleScore = scorer(item.title.trim(), query.trim()) * 2;
      		var urlScore = scorer(item.url.trim(), query.trim());
      		var higherScore = titleScore >= urlScore ? titleScore : urlScore;
      		return {
        		tab: item,
        		score: higherScore
      		};
    	}).filter(function(result) {
      		return result.score > 0;
   		}).sort(function(a, b) {
      		return b.score - a.score;
    	}).map(function(result) {
        	return result.tab;
      	});
  	};
}
