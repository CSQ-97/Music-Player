/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var player =new Vue({
    el:'#player',
    data:{
        query:'',
        searchList:[],
        musicUrl:'',
        musicCover:'',
        hotComments:'',
        isPlaying:false,
        isShow:false,
        mvUrl:''
    },
    methods:{
        searchMusic:function(){
            var that=this;
            //拿到用户输入搜索词对应的歌曲
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(Response){
                // console.log(Response)
                that.searchList=Response.data.result.songs;
            },function(err){})
        },
        play_music:function(musicId)
        {
            var that=this;
            //拿到每条歌曲对应的播放地址 
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(Response)
            {
                // console.log(Response);
                that.musicUrl=Response.data.data[0].url;
            },function(err){});

            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(Response)
            {
                // console.log(Response);
                that.musicCover=Response.data.songs[0].al.picUrl;
            },function(err){})

            axios.get("https://autumnfish.cn/comment/hot?type=0&mvid="+musicId)
            .then(function(Response){
                // console.log(Response),
                that.hotComments=Response.data.hotComments
            },function(err){})

        },
        play:function(){
            this.isPlaying=true
        },
        pause:function(){
            this.isPlaying=false
        },
        playMv:function(mvid){
            var that=this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(Response){
                console.log(Response)
                that.isShow=true;
                that.mvUrl=Response.data.data.url
            },function(err){})
        },
        hide:function(){
            this.isShow=false;
        }

    }
})
  