handleKeywords = function(keywords, zone) {
  var keywordsLength = keywords.length;

  if (typeof keywords === 'string' && keywordsLength >= 2) {
    zone = zone || '上海'; 

    if (keywords.indexOf(zone) >= 0) {
      if (keywordsLength >= 4) {
        return {
          flag: true,
          searchKeywords: [keywords]
        };
      } else {
        return {
          flag: false,
          searchKeywords: []
        };
      }
    } else {
      searchKeywords = [zone + keywords, keywords + '（' + zone + '）'];
      return {
        flag: true,
        searchKeywords: searchKeywords
      }
    }
  } else {
    return {
      flag: false,
      searchKeywords: []
    }

  }
}