const MimeTypeDisplay: Record<string, string> = {
  // Documentation
  'application/pdf': 'Adobe PDF',
  'image/pdf': 'Adobe PDF',
  'text/pdf': 'Adobe PDF',
  'application/x-pdf': 'Adobe PDF',
  'application/cnt': 'Windows Help Contents File',
  'application/msword': 'MS Word',
  'application/vnd.ms-excel': 'MS Excel Spreadsheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'MS Excel Spreadsheet',
  'application/vnd.ms-powerpoint': 'MS Powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'MS Powerpoint',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'MS Word',
  'application/vnd.oasis.opendocument.spreadsheet': 'OpenOffice Spreadsheet',
  'application/vnd.ms-excel.sheet.macroenabled.12': 'MS Excel Spreadsheet',
  // Text
  'text/plain': 'Plain Text',
  'text/x-log': 'Application Log',
  'text/html': 'HTML',
  'application/x-tex': 'LaTeX',
  'text/x-tex': 'LaTeX',
  'text/markdown': 'Markdown Text',
  'text/x-markdown': 'Markdown Text',
  'text/x-r-markdown': 'R Markdown Text',
  'application/rtf': 'Rich Text Format',
  'text/x-rst': 'reStructuredText',
  'text/rtf': 'Rich Text Format',
  'text/richtext': 'Rich Text Format',
  'text/turtle': 'Turtle RDF',
  'application/xml': 'XML',
  'text/xml': 'XML',
  // Code
  'text/x-c': 'C++ Source',
  'text/x-c++src': 'C++ Source',
  'text/css': 'Cascading Style Sheet',
  'text/x-fortran': 'Fortran Source Code',
  'application/java-vm': 'Java Class',
  'text/x-java-source': 'Java Source Code',
  'text/javascript': 'Javascript Code',
  'application/javascript': 'Javascript Code',
  'application/x-javascript': 'Javascript Code',
  'text/x-matlab': 'MATLAB Source Code',
  'text/x-mathematica': 'Mathematica Input',
  'text/x-objcsrc': 'Objective-C Source Code',
  'text/x-pascal': 'Pascal Source Code',
  'text/x-perl': 'Perl Script',
  'text/x-perl-script': 'Perl Script',
  'text/php': 'PHP Source Code',
  'application/postscript': 'Postscript',
  'text/x-python': 'Python Source Code',
  'text/x-python-script': 'Python Source Code',
  'text/x-r-source': 'R Source Code',
  'text/x-sh': 'Shell Script',
  'application/x-sh': 'Shell Script',
  'application/x-shellscript': 'Shell Script',
  'application/x-sql': 'SQL Code',
  'text/x-sql': 'SQL Code',
  'application/x-swc': 'Shockwave Flash Component',
  'application/x-msdownload': 'Windows Executable',
  'application/x-ipynb+json': 'Jupyter Notebook',
  'application/x-stata-ado': 'Stata Ado Script',
  'application/x-stata-do': 'Stata Do Script',
  'application/x-stata-dta': 'Stata Data Script',
  'application/x-stata-smcl': 'Stata Markup and Control Language',
  'text/x-stata-syntax': 'Stata Syntax',
  'application/x-stata-syntax': 'Stata Syntax',
  'text/x-spss-syntax': 'SPSS Syntax',
  'application/x-spss-syntax': 'SPSS Syntax',
  'application/x-spss-sps': 'SPSS Script Syntax',
  'text/x-sas-syntax': 'SAS Syntax',
  'application/x-sas-syntax': 'SAS Syntax',
  'type/x-r-syntax': 'R Syntax',
  'application/vnd.wolfram.mathematica.package': 'Wolfram Mathematica Code',
  'application/vnd.wolfram.mathematica': 'Wolfram Mathematica Code',
  'text/x-workflow-description-language': 'Workflow Description Language',
  'text/x-computational-workflow-language': 'Computational Workflow Language',
  'text/x-nextflow': 'Nextflow Script',
  'text/x-r-notebook': 'R Notebook',
  'text/x-ruby-script': 'Ruby Source Code',
  'text/x-dagman': 'DAGMan Workflow',
  'text/x-makefile': 'Makefile Script',
  'text/x-snakemake': 'Snakemake Workflow',
  // Ingested Tabular Data
  'text/tab-separated-values': 'Tab-Delimited',
  'text/tsv': 'Tab-Separated Values',
  'text/comma-separated-values': 'Comma Separated Values',
  'text/x-comma-separated-values': 'Comma Separated Values',
  'text/csv': 'Comma Separated Values',
  'text/x-fixed-field': 'Fixed Field Text Data',
  'application/vnd.flographit': 'FloGraphIt Media',
  'application/x-r-data': 'R Data',
  'application/x-rlang-transport': 'R Data',
  'application/x-R-2': 'R Binary',
  'application/x-stata': 'Stata Binary',
  'application/x-stata-6': 'Stata Binary',
  'application/x-stata-13': 'Stata 13 Binary',
  'application/x-stata-14': 'Stata 14 Binary',
  'application/x-stata-15': 'Stata 15 Binary',
  'application/x-spss-por': 'SPSS Portable',
  'application/x-spss-portable': 'SPSS Portable',
  'application/x-spss-sav': 'SPSS Binary',
  'application/x-sas': 'SAS',
  'application/x-sas-transport': 'SAS Transport',
  'application/x-sas-system': 'SAS System',
  'application/x-sas-data': 'SAS Data',
  'application/x-sas-catalog': 'SAS Catalog',
  'application/x-sas-log': 'SAS Log',
  'application/x-sas-output': 'SAS Output',
  'application/softgrid-do': 'Softgrid DTA Script',
  'application/x-dvn-csvspss-zip': 'CSV (w/SPSS card)',
  'application/x-dvn-tabddi-zip': 'TAB (w/DDI)',
  'application/x-emf': 'Extended Metafile',
  'application/x-h5': 'Hierarchical Data Format',
  'application/x-hdf': 'Hierarchical Data Format',
  'application/x-hdf5': 'Hierarchical Data Format',
  'application/geo+json': 'GeoJSON',
  'application/json': 'JSON',
  'application/mathematica': 'Mathematica',
  'application/matlab-mat': 'MATLAB Data',
  'application/x-matlab-data': 'MATLAB Data',
  'application/x-matlab-figure': 'MATLAB Figure',
  'application/x-matlab-workspace': 'MATLAB Workspace',
  'text/x-vcard': 'Virtual Contact File',
  'application/x-xfig': 'MATLAB Figure',
  'application/x-msaccess': 'MS Access',
  'application/netcdf': 'Network Common Data Form',
  'application/x-netcdf': 'Network Common Data Form',
  'application/vnd.lotus-notes': 'Notes Storage Facility',
  'application/x-nsdstat': 'NSDstat',
  'application/vnd.realvnc.bed': 'PLINK Binary',
  'application/vnd.ms-pki.stl': 'STL Format',
  'application/vnd.isac.fcs': 'FCS Data',
  'application/java-serialized-object': 'Java Serialized Object',
  'chemical/x-xyz': 'Co-Ordinate Animation',
  // FITS
  'image/fits': 'FITS',
  'application/fits': 'FITS',
  // Shape
  'application/dbf': 'dBASE Table for ESRI Shapefile',
  'application/dbase': 'dBASE Table for ESRI Shapefile',
  'application/prj': 'ESRI Shapefile',
  'application/sbn': 'ESRI Spatial Index',
  'application/sbx': 'ESRI Spatial Index',
  'application/shp': 'Shape',
  'application/shx': 'Shape',
  'application/x-esri-shape': 'ESRI Shapefile',
  'application/vnd.google-earth.kml+xml': 'Keyhole Markup Language',
  'application/zipped-shapefile': 'Zipped Shapefiles',
  // Archive
  'application/zip': 'ZIP Archive',
  'application/x-zip-compressed': 'ZIP Archive',
  'application/vnd.antix.game-component': 'ATX Archive',
  'application/x-bzip': 'Bzip Archive',
  'application/x-bzip2': 'Bzip Archive',
  'application/vnd.google-earth.kmz': 'Google Earth Archive',
  'application/gzip': 'Gzip Archive',
  'application/x-gzip': 'Gzip Archive',
  'application/x-gzip-compressed': 'Gzip Archive',
  'application/rar': 'RAR Archive',
  'application/x-rar': 'RAR Archive',
  'application/x-rar-compressed': 'RAR Archive',
  'application/tar': 'TAR Archive',
  'application/x-tar': 'TAR Archive',
  'application/x-compressed': 'Compressed Archive',
  'application/x-compressed-tar': 'TAR Archive',
  'application/x-7z-compressed': '7Z Archive',
  'application/x-xz': 'XZ Archive',
  'application/warc': 'Web Archive',
  'application/x-iso9660-image': 'Optical Disc Image',
  'application/vnd.eln+zip': 'ELN Archive',
  // Image
  'image/gif': 'GIF Image',
  'image/jpeg': 'JPEG Image',
  'image/jp2': 'JPEG-2000 Image',
  'image/x-portable-bitmap': 'Bitmap Image',
  'image/x-portable-graymap': 'Graymap Image',
  'image/png': 'PNG Image',
  'image/x-portable-anymap': 'Anymap Image',
  'image/x-portable-pixmap': 'Pixmap Image',
  'application/x-msmetafile': 'Enhanced Metafile',
  'application/dicom': 'DICOM Image',
  'image/dicom-rle': 'DICOM Image',
  'image/nii': 'NIfTI Image',
  'image/cmu-raster': 'Raster Image',
  'image/x-rgb': 'RGB Image',
  'image/svg+xml': 'SVG Image',
  'image/tiff': 'TIFF Image',
  'image/bmp': 'Bitmap Image',
  'image/x-xbitmap': 'Bitmap Image',
  'image/RAW': 'Bitmap Image',
  'image/raw': 'Bitmap Image',
  'application/x-tgif': 'TGIF File',
  'image/x-xpixmap': 'Pixmap Image',
  'image/x-xwindowdump': 'X Windows Dump',
  'application/photoshop': 'Photoshop Image',
  'image/vnd.adobe.photoshop': 'Photoshop Image',
  'application/x-photoshop': 'Photoshop Image',
  // Audio
  'audio/x-aiff': 'AIFF Audio',
  'audio/mp3': 'MP3 Audio',
  'audio/mpeg': 'MP3 Audio',
  'audio/mp4': 'MPEG-4 Audio',
  'audio/x-m4a': 'MPEG-4 Audio',
  'audio/ogg': 'OGG Audio',
  'audio/wav': 'Waveform Audio',
  'audio/x-wav': 'Waveform Audio',
  'audio/x-wave': 'Waveform Audio',
  // Video
  'video/avi': 'AVI Video',
  'video/x-msvideo': 'AVI Video',
  'video/mpeg': 'MPEG Video',
  'video/mp4': 'MPEG-4 Video',
  'video/x-m4v': 'MPEG-4 Video',
  'video/ogg': 'OGG Video',
  'video/quicktime': 'Quicktime Video',
  'video/webm': 'WebM Video',
  // Network Data
  'text/xml-graphml': 'GraphML Network Data',
  // Other
  'application/octet-stream': 'Unknown',
  'application/x-docker-file': 'Docker Image File',
  'application/x-vagrant-file': 'Vagrant Image File',
  // Dataverse-specific
  'application/vnd.dataverse.file-package': 'Dataverse Package'
}

export default MimeTypeDisplay
