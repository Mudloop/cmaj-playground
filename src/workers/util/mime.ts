import Mime from '../../../node_modules/mime/dist/src/Mime';
import standardTypes from 'mime/types/standard.js';
import otherTypes from 'mime/types/other.js';
export const mime = new Mime(standardTypes, otherTypes, { 'application/json': ['cmajorpatch'], 'text/plain': ['cmajor'] });