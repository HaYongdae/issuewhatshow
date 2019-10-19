#!/usr/bin/python
# -*- coding: utf-8 -*-
#crawllica.py

from harvesta import harvesta
from preproca import preproca
import platform
import sys

def doCrawlling(path):
    return harvesta.harvest(path)

def  doPreproc(path):
    preproca.preproc(path)


if __name__ == "__main__":
    if platform.system() == "Windows":
        outPath = doCrawlling("c:\\crawllica_output")
        # outPath = "C:\\crawllica_output\\191016\\1710"
        doPreproc(outPath)
    else:
        if len(sys.argv) < 2:
            print("usage: crawllica [output path]")
            exit(1)
        
        outPath = doCrawlling(sys.argv[1])
        doPreproc(outPath)
