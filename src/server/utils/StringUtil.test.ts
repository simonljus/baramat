import { it,describe,expect } from 'vitest'
import { StringUtil } from './StringUtil'

const convertMarkdownToHtml = StringUtil.convertMarkdownToHtml
const convertMarkdownToText = StringUtil.convertMarkdownToText;
describe('convertMarkdownToHtml', () => {
    it('returns emty string if markdown is undefined', () => {
    expect(convertMarkdownToHtml()).toEqual('')
    })
    it('converts markdown to html', () => {
    const md = '* item 1\n * item 2\n * item 3\n'
    const expected = `<ul>\n<li>item 1</li>\n<li>item 2</li>\n<li>item 3</li>\n</ul>`
    expect(convertMarkdownToHtml(md)).toEqual(expected)
    })
    it('removes html tags that are not specifically allowed', () => {
    const md = '# header\n<iframe href="http://www.google.com"></iframe>'
    const expected = `<h1 id="header">header</h1>`
    const allowedTags = { h1: ['id'] }
    expect(convertMarkdownToHtml(md, allowedTags)).toEqual(expected)
    })
    it('includes html tags in allowedTags property', () => {
    const md = '# header\n\n<iframe href="http://www.google.com"></iframe>'
    const expected = `<h1 id="header">header</h1>\n<iframe href="http://www.google.com"></iframe>`
    const allowedTags = { h1: ['id'], iframe: ['href'] }
    expect(convertMarkdownToHtml(md, allowedTags)).toEqual(expected)
    })
    })
    describe('convertMarkdownToText', () => {
    it('returns empty string if no argument is given', () => {
    expect(convertMarkdownToText()).toEqual('')
    })
    it('converts markdown to text', () => {
    const md = '* header\ntext content with **bold** text in it.'
    const expected = 'header text content with bold text in it.'
    expect(convertMarkdownToText(md)).toEqual(expected)
    })
    })