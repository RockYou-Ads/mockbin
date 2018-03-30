'use strict'

module.exports = function crossdomain (req, res) {
  res.type('text/xml')
  res.send('<?xml version="1.0"?>\n'+
  '<!DOCTYPE cross-domain-policy SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">\n'+
  '<cross-domain-policy>\n'+
  '    <site-control permitted-cross-domain-policies="all"/>\n'+
  '    <allow-access-from domain="*" secure="false"/>\n'+
  '    <allow-http-request-headers-from domain="*" headers="*" secure="false"/>\n'+
  '</cross-domain-policy>\n')
}
