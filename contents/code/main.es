/*
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU Library General Public License version 2 as
 *   published by the Free Software Foundation
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details
 *
 *   You should have received a copy of the GNU Library General Public
 *   License along with this program; if not, write to the
 *   Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

function init()
{
    comic.comicAuthor = "Maki Naro";
    comic.firstIdentifier = "comic/the-beach";
    comic.websiteUrl = "http://sufficientlyremarkable.com/";
    comic.shopUrl = "http://sufficientlyremarkable.com/store";
 
   // check if the comic.identifier is empty or initilise
   if (comic.identifier != new String()) {
       
     comic.websiteUrl += comic.identifier;
       comic.requestPage(comic.websiteUrl, comic.Page);
       comic.requestPage(comic.websiteUrl + comic.identifier, comic.Page);
    } else {
        comic.requestPage(comic.websiteUrl + comic.firstIdentifier, comic.User);
	
   }
}

function pageRetrieved(id, data)
{
//find the most recent comic
    if (id == comic.User) {
     
        var re = new RegExp("<a class=\"comicPagination nav-last\" href=\"http://sufficientlyremarkable.com/([^\"]+)\" ", "i");
        var match = re.exec(data);
        if (match != null) {
            comic.lastIdentifier = match[1];
            comic.identifier = comic.lastIdentifier;
            comic.websiteUrl += comic.identifier;
            comic.requestPage(comic.websiteUrl, comic.Page);
        } else {
            comic.error();
        }
    }
    
   if (id == comic.Page) {
         
	re = new RegExp("<img src=\'(http://sufficientlyremarkable.com/images/comics/[^\"]+)\' class=\"comic\"", "i");
        match = re.exec(data);
        if (match != null) {  
	  //comic.title=match[3];
	  //comic.additionalText=match[2];
          comic.requestPage(match[1], comic.Image);
	  
        } else {
            comic.error();
            return;
        }          
        
//previous identifier
        re = new RegExp("<a class=\"comicPagination nav-prev\" href=\"http://sufficientlyremarkable.com/([^\"]+)\">", "i");
        match = re.exec(data);
        if (match != null) {
            comic.previousIdentifier = match[1];
        }
 
//next identifier
        re = new RegExp("<a class=\"comicPagination nav-next\" href=\"http://sufficientlyremarkable.com/([^\"]+)\">", "i");
        match = re.exec(data);
        if (match != null) {
            comic.nextIdentifier = match[1];
        }
    }
}
