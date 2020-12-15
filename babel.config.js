module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:[
      [
        "module-resolver",
        {
          root:["./"],
          alias:{
            "@images": "./assets/images",
            "@screens": "./src/screens",
            "@styles": "./src/styles",
            "@components": "./src/components",
            "@navigators": "./src/navigators",
            "@api": "./src/api",
            
          },
        },
      ],
    ],
  };
};
