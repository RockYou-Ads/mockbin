/* globals $, hljs, FileReader */

var sample = {
  text: {
    status: 200,
    statusText: 'OK',
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: 'Content-Type',
        value: 'text/plain'
      }
    ],
    cookies: [],
    content: {
      mimeType: 'text/plain',
      text: 'Hello World'
    }
  },

  json: {
    status: 200,
    statusText: 'OK',
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: 'Content-Type',
        value: 'application/json'
      }
    ],
    cookies: [],
    content: {
      mimeType: 'application/json',
      'ext': '{\n    "foo: "Hello Word"\n}'
    }
  },

  jsonp: {
    status: 200,
    statusText: 'OK',
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: 'Content-Type',
        value: 'application/javascript'
      }
    ],
    cookies: [],
    content: {
      mimeType: 'application/javascript',
      'ext': 'callback({\n    "foo: "Hello Word"\n})'
    }
  },

  server_response: {
    status: 200,
    statusText: 'OK',
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: ['Content-Type'],
        value: ['application/javascript']
      }
    ],
    cookies: [
      {
        name: ['aj_dsp'],
        value: ['RiM2VCAwkqBEbBDl8fYxiQhYoIZ1b8Fm_HrGobN_uCb7wB6hmCdvWNPqpXFlAtQpROuL_Nq_5Q62ww7g4EoTl7FFLQQXn8A9wcfkg_l6eIA']
      }
    ],
    content: {
      'ads': [
        {
          'adSpotId': 1480,
          'placementId': '1480',
          'adType': 'video',
          'extraHtml': [],
          'requestId': 'a39e3f18-94e0-4bd3-a352-94d804ab3cec',
          'opportunityId': 'd2486bb8-4586-4509-bc51-bdf2163c07f4',
          'player': {
            'name': 'ima',
            'data': {
              'vastXml': '<?xml version=\"1.0\" encoding=\"UTF-8\"?><VAST version=\"2.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"vast.xsd\"><Ad id=\"139914394900000\"><InLine><AdSystem version=\"2.0\">Mediatastic</AdSystem><Error><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb055cfac09a6f814514ae8b6f61be1a8139f5e7e99b0a60e732871d12e5aa3468740b1a56836f8a4ab1725a0431840a0ed35108c411969228d165253f0feebe6375de2375e2c09acf97538264f102dd13]]></Error><Impression><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bbaeb12564dc4a15a529b0c8536e6aec60a54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba228ea9247791a83dc85f3fe4a01cf35b5a7616c528f28a500ec7d006ea4996a0256522a671d144ff39133bba27800c3f9c]]></Impression><Impression><![CDATA[https://tas.rockyou.net/servlet/rotator/1480/0/impr?ajkey=V12D5F275CDJ-573J8500H8719C270A2FJ3624J1466QI124QQP0G00G0Q12A96F521G5302EW30041G3302E300001011000G0PH111H36W8a39e3f182DW494e02DW44bd32DW4a3522DX1294d804ab3cecG0G0101109G9W9unwrapperG01FFG0H26W5https3A2F2FW4apps2EW8facebook2EW3com2FG9W9vast_146605]]></Impression><Creatives><Creative><Linear><Duration><![CDATA[00:00:30]]></Duration><MediaFiles><MediaFile delivery=\"progressive\" height=\"3\" type=\"video/mp4\" width=\"4\"><![CDATA[https://cdnrockyou-a.akamaihd.net/apps/socialvideoads/ads/sprint_boss_bcu/full_video.f4v]]></MediaFile></MediaFiles><TrackingEvents><Tracking event=\"start\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb1c016b78ff9040e1589ab699819ff91aa2e3d8e0d1b149f54a1bbc769e996e8bccb0dea3434f1a8d685e284eedb8ca55a59cf21d5acd00c22b41483ff371c01ee46e878bd4cbb5acc0781e85ea5336aa]]></Tracking><Tracking event=\"firstQuartile\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb055cfac09a6f8145d78daf05034255e1a54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba228ae0ebb2b536d2aabaea87c76ad1e57d6a98915bd09c1a343bdeecd0eef7397ecf53dd97b0f2460cfbfd5a55c28a5c12]]></Tracking><Tracking event=\"midpoint\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb1c016b78ff9040e1764800445ceabb49a54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba2279936c753f4fdf44a45193f5ef9f465187d3ce27391b58b071d9062133b2c9baaa09892fbf6a6234]]></Tracking><Tracking event=\"thirdQuartile\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb055cfac09a6f8145048ba4a5278351a41b44e0777e73547732871d12e5aa3468740b1a56836f8a4ab1725a0431840a0e2168c52deb97b5d3cd186d734608829ed165253f0feebe6375de2375e2c09acf97538264f102dd13]]></Tracking><Tracking event=\"complete\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb055cfac09a6f8145d084f49392155dd5cf80ac3d15c24b3e32871d12e5aa3468740b1a56836f8a4ab1725a0431840a0e97ac6459057412d15f310f57c750bed35d079973c51cd9d84e1a299ef157c9f0]]></Tracking><Tracking event=\"mute\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bbbe50cf3cc29879923297ce1e5886d126a54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba2279936c753f4fdf44729d376a5a7655222b41483ff371c01ee46e878bd4cbb5acc0781e85ea5336aa]]></Tracking><Tracking event=\"pause\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bbbe50cf3cc2987992dd0e77e60fe177e1a54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba225a0de177827bb65a8c5d9643463a7c2d3bdeecd0eef7397ecf53dd97b0f2460cfbfd5a55c28a5c12]]></Tracking><Tracking event=\"fullscreen\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bbbe50cf3cc298799208ab12908c436acfa54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba228ae0ebb2b536d2aaa1716bd296eeadfc7616c528f28a500ec7d006ea4996a0256522a671d144ff39133bba27800c3f9c]]></Tracking><Tracking event=\"mute\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bbbe50cf3cc29879927a75e22bc7dd6b35a54c4982ffb5b3ac1fe8ddf77fbce7373cdf52a6bed8ba2279936c753f4fdf44729d376a5a7655222b41483ff371c01ee46e878bd4cbb5acc0781e85ea5336aa]]></Tracking></TrackingEvents><VideoClicks><ClickThrough><![CDATA[https://clk.atdmt.com/SRT/go/404650698/direct;wi.1;hi.1/01/]]></ClickThrough><ClickTracking id=\"TRACK\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bbc5cd876d6410f5ac1e863d582946406ca2e3d8e0d1b149f54a1bbc769e996e8bccb0dea3434f1a8d0ad16ab6bcfa76abd2c33a8ff3ab0021876876da14f4814b2b41483ff371c01ee46e878bd4cbb5acc0781e85ea5336aa]]></ClickTracking><ClickTracking><![CDATA[https://tas.rockyou.net/servlet/rotator/1480/0/ch?ajkey=V12D5F275CDJ-573J8500H8719C270A2FJ3624J1466QI124QQP0G00G0Q12A96F521G5302EW30041G3302E300001011000G0PH111H36W8a39e3f182DW494e02DW44bd32DW4a3522DX1294d804ab3cecG0G0101109G9W9unwrapperG01FFG0H26W5https3A2F2FW4apps2EW8facebook2EW3com2FG9W9vast_146605]]></ClickTracking></VideoClicks></Linear></Creative><Creative><CompanionAds><Companion height=\"390\" id=\"sprint_boss_bcu\" width=\"690\"><StaticResource creativeType=\"image/jpeg\"><![CDATA[https://clk.atdmt.com/SRT/go/404650698/direct;wi.1;hi.1/01/]]></StaticResource><TrackingEvents><Tracking event=\"creativeView\"><![CDATA[https://rya.rockyou.com/ams/imp.php?key=_94bde95967a0c4bb055cfac09a6f81457956537b74136b1674da7bee4efccf3632871d12e5aa3468740b1a56836f8a4ab1725a0431840a0ec4d3a7640c9869647c32c0af2f5d0af2a2e096db8d58f5f5411a1d161e0f8d41601a963d37046112]]></Tracking></TrackingEvents><CompanionClickThrough><![CDATA[https://cdnrockyou-a.akamaihd.net/apps/socialvideoads/ads/sprint_boss_bcu/bcu_bg.jpg]]></CompanionClickThrough></Companion></CompanionAds></Creative></Creatives></InLine></Ad></VAST>',
              'vastUrl': 'https://tas.rockyou.net/servlet/rotator/1480/0/sv?id=a39e3f18-94e0-4bd3-a352-94d804ab3cec',
              'startMuted': false
            }
          },
          'settings': {
            'reward': {
              'enableTime': 0,
              'hideHelpLink': true
            },
            'autoComplete': 20,
            'closeButton': {
              'buttonType': 'close',
              'countdown': 10,
              'countdownText': 'You can close in {countdown} {timetext}'
            },
            'headerText': 'Zynga Int Wrapper',
            'hideUntilAvailable': false,
            'referrerOverride': false,
            'watchdog': 30,
            'passbackURL': 'https://tas.rockyou.net:443/servlet/rotator/1480/0/vast3?ajreferer=https%3A%2F%2Fapps.facebook.com%2F&depth=2&format=json&nc=0b680516-31eb-fa56-34f3-0e89cc171a0e&adSpotId=1480&z=qazone&url=https%3A%2F%2Fapps.facebook.com%2F&frame_url=https%3A%2F%2Fadstest2.playzooworld.com%2Frockadmin%2Fads%2F&title=ryCore_1480&media=facebook.com&option1=true&width=741&height=390&prebidv=31&prebidvc=1&iads=3624&cancel=V12D5F275CDJ-573J8500H8719C270A2FJ3624J1466QI124QQP0G00G0Q12A96F521G5302EW30041G3302E300001011000G0PH111H36W8a39e3f182DW494e02DW44bd32DW4a3522DX1294d804ab3cecG0G0101109G9W9unwrapperG01FFG0H26W5https3A2F2FW4apps2EW8facebook2EW3com2FG9W9vast_146605&opportunity_id=d2486bb8-4586-4509-bc51-bdf2163c07f4',
            'splashURL': 'https://tas.rockyou.net:443/servlet/rotator/1480/0/vh?ajreferer=https%3A%2F%2Fapps.facebook.com%2F&depth=2&nc=0b680516-31eb-fa56-34f3-0e89cc171a0e&adSpotId=1480&z=qazone&url=https%3A%2F%2Fapps.facebook.com%2F&frame_url=https%3A%2F%2Fadstest2.playzooworld.com%2Frockadmin%2Fads%2F&title=ryCore_1480&media=facebook.com&option1=true&width=741&height=390&prebidv=31&prebidvc=1&adtype=nonvideo&opportunity_id=d2486bb8-4586-4509-bc51-bdf2163c07f4'
          },
          'info': {
            'ad_id': '3624',
            'ad_server': '003',
            'advertiser_id': '1465',
            'campaign_id': '1466',
            'geo': 'United States/California/San Jose',
            'ip': '156.39.10.47',
            'pub_id': '1479',
            'version': '130.0.1',
            'web_server': '003'
          },
          'width': 300,
          'height': 250
        }
      ]
    }
  },
  xml: {
    status: 200,
    statusText: 'OK',
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: 'Content-Type',
        value: 'application/xml'
      }
    ],
    cookies: [],
    content: {
      mimeType: 'application/xml',
      text: '<?xml version="1.0"?>\n<foo>Hello World</foo>'
    }
  }
}

$(function () {
  $('select[name="example"]').on('change', function (e) {
    var data = sample[$(this).val()]

    if (data) {
      $('input[name="response"]').val(JSON.stringify(data))
      $('pre code').text(JSON.stringify(data, null, 2))
      hljs.highlightBlock($('pre code')[0])
    }
  })

  $('input[type="file"]').on('change', function (e) {
    var file = e.target.files[0]

    if (!file) {
      return
    }

    var reader = new FileReader()

    reader.onload = function (e) {
      try {
        var data = JSON.parse(e.target.result)
      } catch (e) {
        console.log(e)
      }

      if (data) {
        $('input[name="response"]').val(JSON.stringify(data))

        $('pre code').text(JSON.stringify(data, null, 2))
        hljs.highlightBlock($('pre code')[0])
      }
    }

    reader.readAsText(file)
  })

  var addKeyPair = function (event) {
    var self = $(this)

    var group = self.parents('.form-group')
    var form = self.parents('form')

    group.clone().appendTo(form)
      // ADS-1209 - New item should be blank
      .find('input[name="name"], input[name="value"]')
      .val('')
  }

  var processFormData = function (event) {
    var response = {
      status: '',
      statusText: '',
      httpVersion: 'HTTP/1.1',
      headers: [],
      cookies: [],
      content: {
        mimeType: '',
        text: ''
      },
      locked: false,
      description: undefined
    }

    $('.has-error').removeClass('has-error')

    $('.form input:not(:valid)').each(function () {
      $(this).parents('.form-group').addClass('has-error')
    })

    var forms = [{form: 'description', parent: response}, {form: 'status', parent: response}, {form: 'content', parent: response.content}, {form: 'lock-status', parent: response}]

    forms.forEach(function (item) {
      $('form[name="' + item.form + '"] div.form-group:not(.pair) .form-control').each(function () {
        var self = $(this)
        item.parent[self.attr('name')] = self.val()
      })
    })

    var groups = ['headers', 'cookies']

    groups.forEach(function (pair) {
      var params = []

      $('form[name="' + pair + '"] .pair input[name="name"]')
      .filter(function (header) {
        return /^[\w\d]+$/.test($(header).siblings('input[name="name"]').val())
      })
      .each(function (index, header) {
        var value = $(header).val()

        if (value.trim() !== '') {
          params.push({name: value})
        }
      })

      $('form[name="' + pair + '"] .pair input[name="value"]')
      .filter(function (header) {
        return /^[\w\d]+$/.test($(header).siblings('input[name="name"]').val())
      })
      .each(function (index, header) {
        if (params[index]) {
          params[index].value = $(header).val()
        }
      })

      response[pair] = params
    })

    // fix type issues
    response.status = parseInt(response.status, 10)

    $('input[name="response"]').val(JSON.stringify(response))
    $('pre code').text(JSON.stringify(response, null, 2))

    hljs.highlightBlock($('pre code')[0])
  }

  $('.toggle-comments').on('click', function (event) {
    $('.form').toggleClass('no-comments')
    $('.form  input[name="comment"]').attr('disabled', $(this).hasClass('active'))
  })

  $('form').on('click', '.form-group.pair:last-of-type .btn-success', addKeyPair)

  // ADS-1209 - Clicking shouldn't create new item
  // this is a terribad feature
  // $('form').on('focus', '.form-group.pair:last-child input', addKeyPair)

  $('form').on('click', '.form-group.pair .btn-danger', function (event) {
    $(this).parents('.form-group').remove()
  })

  $('form').on('keyup keypress change blur', '.form-control', processFormData)
  $('form').on('click', '[type!="submit"].btn', processFormData)

  $(document).ready(function () {
    processFormData()
  })
})
