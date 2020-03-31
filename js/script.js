'use strict';

const opt = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TagsListSelector: '.tags.list',
  AuthorsListSelector: '.authors.list',
  CloudClassCount: 4,
  CloudClassPrefix: 'tag-size-',
};

const titleClickHandler = function (event) {

  event.preventDefault();                                                   
  const clickedElement = this;                                              
  
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');        
  for (let activeLink of activeLinks) {                                     
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');                                  
  
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');        
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');             
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleTarget = articleSelector.replace('#', '');                  

  /* [DONE] add class 'active' to the correct article */
  document.getElementById(articleTarget).classList.add('active');          
};



function generateTitleLinks(customSelector = '') {
  
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opt.TitleListSelector);           
  titleList.innerHTML = '';                                                 

  let html = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);                                        //dlaczego customSelector musi być w tej linii skoro customSelector = ''
  
  for (let article of articles) {                                           

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML; 
    
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');                           
    
    /* [DONE] create HTML of the link */
    const linkHTML = '<li class="btn"><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* [DONE] insert link into titleList */
    
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');                                                                   //jak połączyć opt.TitleListSelector (.titles) z 'a'?

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();                                                       

function calculateTagsParams(tags) {

  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {                                                                                         //czy da się to zapisać w jednej linii np.(params.min > tags[tag] > params.max)
      params.max = tags[tag];
    };
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass (count, params) {

  const classNumber = Math.floor(((count - params.min)/(params.max - params.min)) * opt.CloudClassCount + 1); 

  return classNumber;
  
}


function generateTags() {

  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opt.ArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagList = article.querySelector(opt.ArticleTagsSelector);       


    /* [DONE] make html variable with empty string */
    let htmlTag = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');


    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      
      /* [DONE] generate HTML of the link */
      const linkHTMLtag = '<li><a href="#tag-' + tag + '">' + tag + '   ' + '</a></li>';
      
      /* [DONE] add generated code to html variable */
      htmlTag = htmlTag + linkHTMLtag;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
      
    }
    
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = htmlTag;

    /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opt.TagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    
    const linkHTMLtagsArray = '<li ' + 'class="' + opt.CloudClassPrefix +  calculateTagClass(allTags[tag], tagsParams) + '"><a ' + '" ' + 'href="#tag-' + tag + '">' + tag + '   ' + '</a></li>';
    
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += linkHTMLtagsArray;
    
  /* [DONE] END LOOP: for each tag in allTags: */
  }
  
  /*[DONE] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement2 = this;   

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement2.getAttribute('href');  

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');                                            //dlaczego a.active?

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* [DONE] add class active */
    tagLink.classList.add('active');                                                                                      //po co ma być dodana classa 'active  i gdzie jest ona widoczna?

    /* [DONE] END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tags = document.querySelectorAll('.list-horizontal a');                                              //czy da się zastosować && lub ||

  /* START LOOP: for each link */
  for (let tag of tags) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function addClickListenersToTagsArray() {
  /* find all links to tags */
  const tags = document.querySelectorAll('.tags a');

  /* START LOOP: for each link */
  for (let tag of tags) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTagsArray();

function generateAuthors() {

  let allAuthors = {};

  /* [DONE] find all articles  */
  const articles = document.querySelectorAll(opt.ArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find authors wrapper */
    let authorName = article.querySelector(opt.ArticleAuthorSelector);
    
    /* [DONE] make html variable */
    let htmlAuthor = authorName.innerHTML;
    
    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    
    /* [DONE] generate HTML of the link */
    const linkHTMLauthor = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '   ' + '</a>';

    /* [DONE] add generated code to html variable */
    htmlAuthor = linkHTMLauthor;
    
    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {

      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
      console.log(articleAuthor);
    }

    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorName.innerHTML = htmlAuthor;

    /* [DONE] END LOOP: for each tag */
  }

  const authorList = document.querySelector(opt.AuthorsListSelector);
  
  const authorsParams = calculateTagsParams(allAuthors);

  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    const linkHTMLauthorsArray = '<li ' + 'class="' + opt.CloudClassPrefix +  calculateTagClass(allAuthors[author], authorsParams) + '"><a ' + '" ' + 'href="#author-' + author + '">' + author + '   ' + '</a></li>';
  
    console.log(author);
    allAuthorsHTML += linkHTMLauthorsArray;
  }

  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement3 = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href2 = clickedElement3.getAttribute('href');
  //console.log('href2 to: ', href2);

  /* [DONE] make a new constant "author" and extract tag from the "href" constant */
  const author = href2.replace('#author-', '');

  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {

    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href2" constant */
  const authorLinks = document.querySelectorAll(href2);

  /* [DONE] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {

    /* [DONE] add class active */
    authorLink.classList.add('active');

    /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const authors = document.querySelectorAll('.post-author a');

  /* [DONE] START LOOP: for each link */
  for (let author of authors) {

    /* [DONE] add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();

function addClickListenersToAuthorsArray() {
  /* find all links to tags */
  const authors = document.querySelectorAll('.authors a');

  /* START LOOP: for each link */
  for (let author of authors) {

    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthorsArray();






