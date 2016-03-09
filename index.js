var fis = module.exports = require('fis3');
fis.require.prefixes.unshift('kims');
fis.cli.name = 'kims';
fis.cli.info = require('./package.json');
fis.cli.version = function(){
  var v = "kims v" + fis.cli.info.version
  console.log(v)
}
// 忽略编译文件
fis.config.set("project.ignore",[
  'node_modules/**', 
  'output/**', 
  '.git/**', 
  'fis-conf.js', 
  '**.sh' 
]);

fis.match("*",{
  isMod: false
})

// 绑定相关库
//coffee-script
fis.match('**.{coffee,html:coffee}',{
    parser:fis.plugin("coffee-script"),
    rExt:'js'
});

//less
fis.match('**.less',{
    parser:fis.plugin("less2"),
    rExt:'css'
});

fis.match('*.{js,html:js}', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.{css,less,html:css}', {
  optimizer: fis.plugin('clean-css')
});


//对图片进行压缩
fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

//资源分配
    //image资源 /static/img/文件夹/jpg
fis.match('/Public/({**/*,*}.*)',{
  release:"/static/$1"
});

fis.match('/Public/images/(**)/(*.{jpg,png})',{
    release:'/static/img/$1/$2'
});
fis.match('/Public/images/(*.{jpg,png})',{
    release:'/static/img/$1'
});
  //css资源
fis.match('/Public/less/(*.less)',{
    release:'/static/css/$1'
});
fis.match('/Public/css/(*.css)',{
    release:'/static/css/$1'
});
  //js资源
fis.match('/Public/js/(*.js)',{
    release:'/static/js/$1'
});
fis.match('/Public/coffee/(*.coffee)',{
    release:'/static/js/$1'
});