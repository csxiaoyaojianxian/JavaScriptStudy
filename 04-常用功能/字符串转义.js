/**
 * @function escapeHTML 转义html脚本 < > & " '
 * @param a -
 *            字符串
 */
escapeHTML: function(a){
    a = "" + a;
    return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
},
/**
 * @function unescapeHTML 还原html脚本 < > & " '
 * @param a -
 *            字符串
 */
unescapeHTML: function(a){
    a = "" + a;
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
},