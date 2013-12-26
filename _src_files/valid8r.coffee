###
The MIT License (MIT)

Copyright (c) 2013 Thom Porter (www.thomporter.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
###

extend = require('node.extend');
util = require('util')

class Valid8r
    res:
        alpha: /^[A-z]+$/
        num: /^-?[0-9]+$/
        numNonNeg: /^[0-9]+$/
        alnum: /^[A-z0-9]+$/
        url: /^(([A-z]+):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{2,3}(\.[^:\/\s\.]‌​{2,3})?)(:\d+)?($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/
        url_noproto: /^\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/
        email_simple: /^[^@]+@[A-z0-9_-]+\.[A-z0-9_.-]{2,}$/
        email_default: /^[A-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/
        email_rfc5322: /(?:[A-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-z0-9-]*[A-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
        
    # this can be gotten rid of i believe, just need to break the rules loop 
    # on error, instead of "continue" when @lastResult[field]
    lastResult: {}
    constructor: (options) ->
        defaults=
            rules: {}
            data: {}
            customValidators: {}
        @options = extend defaults, options

    setRules: (rules) ->
        @options.rules = rules
        
    satisfiesConditions: (field, r, rule) ->
        return @options.data[r.conditions[rule.when].field] == r.conditions[rule.when].is
        
    validateAll: () ->
        console.log 'Validate All Called'
        console.log 'iterating Rules:', @options.rules

        errors = {}
        for field of @options.rules
            if @options.rules[field]
                console.log field
                err = @validate(field, @options.data[field])
                errors[field] = err if err != ''
        return errors
        
    validate: (field, value) ->
        r=@options.rules[field]
        if (!r)
            return 'Not Setup in Rules'
        num_rules = 0
        for rule in r.rules
            continue if (rule.when and not @satisfiesConditions(field, r, rule))
            num_rules++
            switch rule.rule
                when "required" then err = @validRequired(field, value, rule)
                when "len" then err = @validLen(field, value, rule)
                when "isAlpha" then err = @validIsAlpha(field, value, rule)
                when "isNum" then err = @validIsNum(field, value, rule)
                when "isAlnum" then err = @validIsAlnum(field, value, rule)
                when "formattedAs" then err = @validFormat(field, value, rule)
                when "regex" then err = @validRegex(field, value, rule)
                when "val" then err = @validVal(field, value, rule)
                when "email" then err = @validEmail(field, value, rule)
                when "url" then err = @validUrl(field, value, rule)
                when "checks" then err = @validChecks(field, value, rule)
                when "radios" then err = @validRadios(field, value, rule)
                when "custom" then err = @validCustom(field, value, rule)
                when "ip" then err = @validIp(field, value, rule)
            return err if err
        return ''
            
    validCustom: (field, value, rule) ->
        err = '__ERR_NEVER_SET__'
        if (rule.func && typeof rule.func is 'function')
            err = rule.func(field, value);
        else if (rule.func && typeof rule.func is 'string')
            if @options.customValidators[rule.func]
                err = @options.customValidators[rule.func](field, value)
        if (err == '__ERR_NEVER_SET__')
            return 'Invalid Custom Function: ' + rule.func
        return err
            
            
    validRequired: (field, value, rule) ->
        if value == ''
            return (rule.errStr || 'Please enter a value.')
            
        return ''

    validRadios: (field, value, rule) ->
        if not value
            return (rule.errStr || 'Please choose a value.')
            
        return ''

    validIp: (field, value, rule) ->
        if value
            if rule.v
                if not value.match(@res['ipv'+rule.v])
                    return rule.errStr || 'Invalid IP Address'
            else
                if not value.match(@res.ipv4) && not value.match(@res.ipv6)
                    return rule.errStr || 'Invalid IP Address'
        return ''

    validLen: (field, value, rule) ->
        len = value.length
        if rule.min && rule.max
            if len < rule.min || len > rule.max
                return (rule.errStr || 'Between %d and %d characters required.')
                

        if rule.min
            if value.length < rule.min
                return (rule.errStr || 'At least %d characters are required.')
                
                
        if rule.max
            if value.length > rule.max
                return (rule.errStr || 'At least %d characters are required.')
                
        return ''

        
    validIsAlpha: (field, value, rule) ->
        if value != '' and not value.match(@res.alpha)
            return (rule.errStr || 'Please enter alphabetic characters only (A-z).')
            
        return ''
        
    validIsNum: (field, value, rule) ->
        if value != ''
            if rule.nonNeg
                if not value.match(@res.numNonNeg)
                    return (rule.errStr || 'Please enter numeric characters only (0-9).')
                    
            else
                if not value.match(@res.num)
                    return (rule.errStr || 'Please enter numeric characters only (0-9).')
                    
        return ''
    
    validIsAlnum: (field, value, rule) ->
        if value != '' and not value.match(@res.alnum)
            return (rule.errStr || 'Please enter alphanumeric characters only (A-z, 0-9).')
            
        return ''
        
    validFormat: (field, value, rule) ->
        if value != '' 
            re = @preg_quote(rule.format)
            re = re.replace(/D/g, '\\d').replace(/A/g, '[a-zA-Z]')
            if not value.match(re)
                return (rule.errStr || 'Does not match required format of: ' + rule.format)
                
        return ''

    validRegex: (field, value, rule) ->
        if value != '' 
            re = new RegExp(rule.pattern, rule.modifiers)
            if not value.match(re)
                return 'Does not match required pattern: ' + rule.pattern
                
        return ''

    validVal: (field, value, rule) ->
        if value != ''
            v = parseFloat(value)
            if v == NaN
                return (rule.nanErrStr || 'Please enter a number.')
                
                
            if rule.is
                if v != rule.is
                    return rule.notIsErrStr || 'Please enter ' + rule.is
                    
            if rule.min
                if v < rule.min
                    return rule.errStr || 'Please enter a number greater than or equal to ' + rule.min
                    
            if rule.max 
                if v > rule.max
                    return (rule.errStr || 'Please enter a number less than or equal to ' + rule.max)
                    
            if rule.outside
                if (v >= rule.outside[0] && v <= rule.outside[1])
                    return (rule.errStr || 'Please enter a number outside of ' + rule.outside[0] + '-' + rule.outside[1])
                    
        return ''
        
    validEmail: (field, value, rule) ->
        if value != ''
            re = rule.validator || 'default'
            if not @res['email_'+re]
                return ('INVALID EMAIL VALIDATOR: ' + re)
                
            if not value.match(@res['email_'+re])
                return (rule.errStr || 'Pleaes enter a valid email address.')
                
        return ''
        
    validUrl: (field, value, rule) ->
        if value isnt ""
            matches = value.match(@res.url)
            if not matches || not matches[4] # 4th match will be the host
                return (rule.errStr || 'Invalid URL, please try again.');
                
            
            if rule.protocols
                protos = []
                if typeof rule.protocols is 'string'
                    protos = rule.protocols.split(',')
                else
                    protos = rule.protocols
                if protos.indexOf(matches[2]) is -1
                    return (rule.errStr || 'Invalid URL Protocol, please enter one of: ' + protos.join(', '))
                    
                    
            else if (rule.noProtocols)
                if matches[2]
                    return (rule.errStr || 'Pleaes enter a URL without protocols (eg, http://, https://, etc.)')
                    
                    
            else if not matches[1]
                return (rule.errStr || 'Invalid URL, please try again.');
                
                
        return ''
        return true
            

    validChecks: (field, value, rule) ->
        num_checked = if util.isArray(value) then value.length else 0
        if rule.min && rule.max
            if rule.min > num_checked || rule.max < num_checked
                return (rule.errStr || 'Please check between ' + rule.min + ' and ' + rule.max + ' options.')
                
        if rule.min
            if rule.min > num_checked
                return (rule.errStr || 'Please check at least ' + rule.min + ' options.')
                
        if rule.max
            if rule.max < num_checked
                return (rule.errStr || 'Please check no more than ' + rule.max + ' options.')
                
        return ''

    preg_quote: (str, delimiter) ->
        ###
        From: http://phpjs.org/functions
        +   original by: booeyOH
        +   improved by: Ates Goral (http://magnetiq.com)
        +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        +   bugfixed by: Onno Marsman
        +   improved by: Brett Zamir (http://brett-zamir.me)
        *     example 1: preg_quote("$40");
        *     returns 1: '\$40'
        *     example 2: preg_quote("*RRRING* Hello?");
        *     returns 2: '\*RRRING\* Hello\?'
        *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
        *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
        ###
        (str + "").replace new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\" + (delimiter or "") + "-]", "g"), "\\$&"

module.exports = Valid8r