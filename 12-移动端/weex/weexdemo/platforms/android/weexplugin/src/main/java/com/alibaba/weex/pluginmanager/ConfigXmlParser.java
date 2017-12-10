/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

package com.alibaba.weex.pluginmanager;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.util.HashMap;

public class ConfigXmlParser {
  private static String TAG = "ConfigXmlParser";
  private String mService = "";
  private boolean mInsideFeature = false;
  private boolean mOnLoad = false;
  private String mApi = "";
  private String mPluginClass = "";
  private String mParamType = "";
  private String mCategory = Constants.CATEGORY_MODULE;
  private HashMap<String, PluginEntry> mComponents = new HashMap<>(20);
  private HashMap<String, PluginEntry> mModules = new HashMap<>(20);


  public HashMap<String, PluginEntry> getPluginModules() {
    return mModules;
  }

  public HashMap<String, PluginEntry> getPluginComponents() {
    return mComponents;
  }

  /**
   * parse the config.xml found in your app's resource to get the plugin info.
   */
  public synchronized void parse(Context context) {
    // First checking the class namespace for config.xml
    int id = context.getResources().getIdentifier("config", "xml", context.getClass().getPackage().getName());
    if (id == 0) {
      // If we couldn't find config.xml there, we'll look in the namespace from AndroidManifest.xml
      id = context.getResources().getIdentifier("config", "xml", context.getPackageName());
      if (id == 0) {
        Log.e(TAG, "res/xml/config.xml is missing!");
        return;
      }
    }
    parse(context.getResources().getXml(id));
  }


  private void parse(XmlPullParser xml) {
    int eventType = -1;

    while (eventType != XmlPullParser.END_DOCUMENT) {
      if (eventType == XmlPullParser.START_TAG) {
        handleStartTag(xml);
      } else if (eventType == XmlPullParser.END_TAG) {
        handleEndTag(xml);
      }
      try {
        eventType = xml.next();
      } catch (XmlPullParserException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  private void handleStartTag(XmlPullParser xml) {
    String strNode = xml.getName();
    if (strNode.equals(Constants.TAG_FEATURE)) {
      mInsideFeature = true;
      mService = xml.getAttributeValue(null, Constants.ATTR_NAME);
    } else if (mInsideFeature && strNode.equals(Constants.TAG_PARAM)) {
      mParamType = xml.getAttributeValue(null, Constants.ATTR_NAME);
      if (mParamType.equals(Constants.ATTR_SERVICE)) // check if it is using the older mService param
        mService = xml.getAttributeValue(null, Constants.ATTR_VALUE);
      else if (mParamType.equals(Constants.ATTR_PACKAGE) || mParamType.equals(Constants.ATTR_ANDROID_PACKAGE))
        mPluginClass = xml.getAttributeValue(null, Constants.ATTR_VALUE);
      else if (mParamType.equals(Constants.ATTR_ONLOAD))
        mOnLoad = "true".equals(xml.getAttributeValue(null, Constants.ATTR_VALUE));
      else if (mParamType.equals(Constants.ATTR_CATEGORY))
        mCategory = xml.getAttributeValue(null, Constants.ATTR_VALUE);
      else if (mParamType.equals(Constants.ATTR_API))
        mApi = xml.getAttributeValue(null, Constants.ATTR_VALUE);
    }
  }

  private void handleEndTag(XmlPullParser xml) {
    String strNode = xml.getName();
    if (strNode.equals(Constants.TAG_FEATURE)) {
      if (TextUtils.equals(Constants.CATEGORY_MODULE, mCategory)) {
        mModules.put(mApi, new PluginEntry(mApi, mPluginClass, mOnLoad, Constants.CATEGORY_MODULE));
      } else if (TextUtils.equals(Constants.CATEGORY_COMPONENT, mCategory)) {
        mComponents.put(mApi, new PluginEntry(mApi, mPluginClass, mOnLoad, Constants.CATEGORY_COMPONENT));
      }

      mService = "";
      mPluginClass = "";
      mInsideFeature = false;
      mOnLoad = false;
      mCategory = Constants.CATEGORY_MODULE;
      mApi = "";
      mParamType = "";
    }
  }

}
