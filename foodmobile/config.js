var app_name = 'foodmobile';

var async_storage_key_prefix = '@' + app_name + ':';

var async_storage_key = {
  user: 'user',
  host: 'host'
};

module.exports = {
  app_name: app_name,
  async_storage_key_prefix: async_storage_key_prefix,
  async_storage_key: async_storage_key
};
