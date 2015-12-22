function getCkanUrl() { return 'https://data.opentechinstitute.org/api/3/action/'; }

function getCkanPackages() {
    var ckan_url = getCkanUrl() + 'package_list';
    $.ajax({
        url: ckan_url,
        dataType: 'json',
        async: false,
        success: function(data) {
            $('body').data('packages', data.result);
        }
    });    
    return $('body').data('packages');
}
function getCkanProjects() {
    var ckan_url = getCkanUrl() + 'tag_show?id=project';
    var gridItem = '';
    $.ajax({
        url: ckan_url,
        dataType: 'json',
        async: false,
        success: function(data) {
            console.log(data.result);
            $.each(data.result.packages, function( k, pack) {
                console.log(pack);
                var gridItem = '<div class="grid-item">';
                gridItem += '<h2>' + pack.title + '</h2>';
                gridItem += '<div class="author">' + pack.author + '</div>'
                if (pack.license_id !== 'notspecified')  {
                    gridItem += '<div class="license"><a href="' + pack.license_url + '">' + pack.license_title + '</a></div>';
                }
                else {
                    gridItem += '<div class="license">' + pack.license_title + '</div>';
                }
                gridItem += '</div>';
                $('#main .grid').append(gridItem);
            });                   
        }
    });     
}

function frontPage() {
    getCkanProjects();    
}


$(document).ready(function() {
    frontPage();
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
    });
});
