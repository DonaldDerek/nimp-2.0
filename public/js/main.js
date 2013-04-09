$(document).ready(function(){
    var online = true;
    
    if(!online){
        SC.initialize({
            client_id: "18057c47126031a99017661840257417",
            redirect_uri: "http://localhost:3000/callback"
        });
    }
    else if(online){
        SC.initialize({
            client_id: "988ae8ccee6597e1d4e45ac225d80ea2",
            redirect_uri: "http://preso.ly:3000/callback"
        });
    }
    /*SC.stream("/tracks/293", function(sound){
       // sound.play();
    });*/
    $(".filter").on('click',function(e){
        e.preventDefault();
        $(this).attr('id');
        $(".filter").removeClass('active');
        $(this).addClass('active');
        $(".s-block").hide();
        $("."+$(this).attr('id')).fadeIn(300);
    });
    $('.listen').on('click', '.tracks', function(){
        var track_id = $(this).data("id");
        //var duration = $(this).data("duration");
        var score = $(this).data("score");
        var artwork_url = $(this).find('img').attr('src');
        var title = $(this).find('.title').text();
        
        $(".player").append("<div class='info-block'><div>");
        $(".info-block").append("<img src='" + artwork_url + "' />");
        $(".info-block").append("<h2>" + title + "</h2>");
        $(".info-block").append("<p> N!MP Score: " + score + "</p>");
        $(".l-comments").addClass('isLeft');
        
        SC.stream("/tracks/" + track_id, {
            
            ontimedcomments: function(comments){
                $(".m-comments").show();
                $(".l-comments").show();
                $(".r-comments").show();
                console.log(comments[0].body);
                var comment = "<div class='comment'>" + comments[0].body + "</div>";
                
                if($(".l-comments").hasClass('isLeft') && $(comment).text().length < 32 ){
                    $(".l-comments").prepend($(comment).hide()
                        .fadeIn("fast")
                        .delay(5000)
                        .fadeOut('fast'));
                                    
                                    
                    $(".l-comments").removeClass('isLeft');
                    $(".r-comments").addClass('isRight');
                }
                else if($(".r-comments").hasClass('isRight') && $(comment).text().length < 32){
                    $(".r-comments").prepend($(comment).hide()
                        .fadeIn("fast")
                        .delay(5000)
                        .fadeOut('fast'));
                                    
                                    
                    
                    
                    $(".l-comments").addClass('isLeft');
                    $(".r-comments").removeClass('isRight');
                }
                else{    
                    $(".m-comments").html($(comment).hide()
                        .fadeIn("fast")
                        .delay(10000)
                        .fadeOut('fast'));
                }
                
            }
        },function(sound){
            sound.play();
            $(".close").on('click', function(){
                $('#player').modal('hide');
                $(".info-block").remove();
                $(".comment").remove();
                sound.stop();
            });
        });
        $('#player').modal('show');   
    });
    
    
    $('.listen').on('click', '.artists', function(){
        
        });    
    $("#connect").on('click',function(e){
        e.preventDefault();
        SC.connect(function(){
            SC.get("/me", function(me){
                $("#username").text(me.username);
                $("#avatar img").attr("src",me.avatar_url);
                //console.log(me);
                $("#connect").fadeOut(200);
                $('.logged-in').delay(200).fadeIn(300);
                
                SC.get("/me/followings", function(followings){
                    var tracks_number = 0;    
                    
                    for(var i = 0; i < followings.length; i++){    
                        if(followings[i].avatar_url && followings[i].track_count > 0){
                            var reputation = followings[i].public_favorites_count + followings[i].followers_count*0.3;
                            var block = "<div data-id='"+followings[i].id+"' class='s-block artists'>\n\
                                                <img src='"+followings[i].avatar_url+"'/>\n\
                                                <div class='text'>\n\
                                                    <h2 class='title'>"+followings[i].username+"</h2>\n\
                                                    <p class='reputation'>Reputation Score: "+parseInt(reputation)+"</p>\n\
                                                    <p class='reputation'>"+followings[i].track_count+" Track</p>\n\
                                                </div>\n\
                                            </div>";
                            $('.l-holder').append(block);
                        }
                        SC.get("/users/" + followings[i].id + "/tracks", function(tracks){
                            tracks_number += tracks.length;
                            $('.track').text(tracks_number + " tracks");
                            // console.log(tracks);
                            for(var j = 0; j < tracks.length; j++){
                                var buzz = 0;
                                
                                if(tracks[j].commentable){
                                    buzz += tracks[j].comment_count*2;
                                }
                                if(tracks[j].downloadable){
                                    buzz += tracks[j].download_count*1.5;
                                }
                                //buzz += tracks[i].playback_count*0.5;
                                
                                if(tracks[j].artwork_url){
                                    //data-duration='"+tracks[j].duration+"'
                                    var block = "<div data-id='"+tracks[j].id+"' data-score='"+parseInt(buzz)+"' class='s-block tracks' style='display:none;'>\n\
                                                <img src='"+tracks[j].artwork_url+"'/>\n\
                                                <div class='text'>\n\
                                                    <h2 class='title'>"+tracks[j].title+"</h2>\n\
                                                    <p>N!MP Score: "+ parseInt(buzz) +"</p>\n\
                                                </div>\n\
                                            </div>";
                                    $('.l-holder').append(block);
                                }     
                            }
                            
                        });
                    }
                      
                    
                });
                
            });
          
        });
        
    });
    

});


    artwork_url: "https://i1.sndcdn.com/artworks-000044267934-a6a57m-large.jpg?ca77017"
    attachments_uri: "https://api.soundcloud.com/tracks/85648420/attachments"
    bpm: null
    comment_count: 10
    commentable: true
    created_at: "2013/03/30 18:59:58 +0000"
    description: "VIP Promo Mix for Geminate Productions/Bushwacked 2013"
    download_count: 17
    download_url: "https://api.soundcloud.com/tracks/85648420/download"
    downloadable: true
    duration: 1246288
    embeddable_by: "all"
    favoritings_count: 20
    genre: "Ghetto Swing Biznass"
    id: 85648420
    isrc: ""
    key_signature: ""
    kind: "track"
    label_id: null
    label_name: ""
    license: "all-rights-reserved"
    original_content_size: 30008872
    original_format: "mp3"
    permalink: "droppin-weight-vip-mini-mix"
    permalink_url: "http://soundcloud.com/2lucid/droppin-weight-vip-mini-mix"
    playback_count: 231
    purchase_title: null
    purchase_url: null
    release: ""
    release_day: null
    release_month: null
    release_year: null
    sharing: "public"
    state: "finished"
    stream_url: "https://api.soundcloud.com/tracks/85648420/stream"
    streamable: true
    tag_list: "glitchy glitch bass ghetto swing deep broken"
    title: "Droppin Weight - VIP Mini Mix for Geminate Productions"
    track_type: ""
    uri: "https://api.soundcloud.com/tracks/85648420"
    user: Object
    user_favorite: false
    user_id: 327013
    user_playback_count: 1
    video_url: null
    waveform_url: "https://w1.sndcdn.com/fLuRUB8twYld_m.png"