/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2b126877ca6d04f85c13";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "category";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/category.js")(__webpack_require__.s = "./src/js/category.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_better-scroll@1.12.6@better-scroll/dist/bscroll.esm.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_better-scroll@1.12.6@better-scroll/dist/bscroll.esm.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*!\n * better-normal-scroll v1.12.6\n * (c) 2016-2018 ustbhuangyi\n * Released under the MIT License.\n */\nvar slicedToArray = function () {\n  function sliceIterator(arr, i) {\n    var _arr = [];\n    var _n = true;\n    var _d = false;\n    var _e = undefined;\n\n    try {\n      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n        _arr.push(_s.value);\n\n        if (i && _arr.length === i) break;\n      }\n    } catch (err) {\n      _d = true;\n      _e = err;\n    } finally {\n      try {\n        if (!_n && _i[\"return\"]) _i[\"return\"]();\n      } finally {\n        if (_d) throw _e;\n      }\n    }\n\n    return _arr;\n  }\n\n  return function (arr, i) {\n    if (Array.isArray(arr)) {\n      return arr;\n    } else if (Symbol.iterator in Object(arr)) {\n      return sliceIterator(arr, i);\n    } else {\n      throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n    }\n  };\n}();\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar toConsumableArray = function (arr) {\n  if (Array.isArray(arr)) {\n    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];\n\n    return arr2;\n  } else {\n    return Array.from(arr);\n  }\n};\n\nfunction eventMixin(BScroll) {\n  BScroll.prototype.on = function (type, fn) {\n    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;\n\n    if (!this._events[type]) {\n      this._events[type] = [];\n    }\n\n    this._events[type].push([fn, context]);\n  };\n\n  BScroll.prototype.once = function (type, fn) {\n    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;\n\n    function magic() {\n      this.off(type, magic);\n\n      fn.apply(context, arguments);\n    }\n    // To expose the corresponding function method in order to execute the off method\n    magic.fn = fn;\n\n    this.on(type, magic);\n  };\n\n  BScroll.prototype.off = function (type, fn) {\n    var _events = this._events[type];\n    if (!_events) {\n      return;\n    }\n\n    var count = _events.length;\n    while (count--) {\n      if (_events[count][0] === fn || _events[count][0] && _events[count][0].fn === fn) {\n        _events[count][0] = undefined;\n      }\n    }\n  };\n\n  BScroll.prototype.trigger = function (type) {\n    var events = this._events[type];\n    if (!events) {\n      return;\n    }\n\n    var len = events.length;\n    var eventsCopy = [].concat(toConsumableArray(events));\n    for (var i = 0; i < len; i++) {\n      var event = eventsCopy[i];\n\n      var _event = slicedToArray(event, 2),\n          fn = _event[0],\n          context = _event[1];\n\n      if (fn) {\n        fn.apply(context, [].slice.call(arguments, 1));\n      }\n    }\n  };\n}\n\n// ssr support\nvar inBrowser = typeof window !== 'undefined';\nvar ua = inBrowser && navigator.userAgent.toLowerCase();\nvar isWeChatDevTools = ua && /wechatdevtools/.test(ua);\nvar isAndroid = ua && ua.indexOf('android') > 0;\n\nfunction getNow() {\n  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date();\n}\n\nfunction extend(target) {\n  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    rest[_key - 1] = arguments[_key];\n  }\n\n  for (var i = 0; i < rest.length; i++) {\n    var source = rest[i];\n    for (var key in source) {\n      target[key] = source[key];\n    }\n  }\n  return target;\n}\n\nfunction isUndef(v) {\n  return v === undefined || v === null;\n}\n\nfunction getDistance(x, y) {\n  return Math.sqrt(x * x + y * y);\n}\n\nvar elementStyle = inBrowser && document.createElement('div').style;\n\nvar vendor = function () {\n  if (!inBrowser) {\n    return false;\n  }\n  var transformNames = {\n    webkit: 'webkitTransform',\n    Moz: 'MozTransform',\n    O: 'OTransform',\n    ms: 'msTransform',\n    standard: 'transform'\n  };\n\n  for (var key in transformNames) {\n    if (elementStyle[transformNames[key]] !== undefined) {\n      return key;\n    }\n  }\n\n  return false;\n}();\n\nfunction prefixStyle(style) {\n  if (vendor === false) {\n    return false;\n  }\n\n  if (vendor === 'standard') {\n    if (style === 'transitionEnd') {\n      return 'transitionend';\n    }\n    return style;\n  }\n\n  return vendor + style.charAt(0).toUpperCase() + style.substr(1);\n}\n\nfunction addEvent(el, type, fn, capture) {\n  el.addEventListener(type, fn, { passive: false, capture: !!capture });\n}\n\nfunction removeEvent(el, type, fn, capture) {\n  el.removeEventListener(type, fn, { passive: false, capture: !!capture });\n}\n\nfunction offset(el) {\n  var left = 0;\n  var top = 0;\n\n  while (el) {\n    left -= el.offsetLeft;\n    top -= el.offsetTop;\n    el = el.offsetParent;\n  }\n\n  return {\n    left: left,\n    top: top\n  };\n}\n\nfunction offsetToBody(el) {\n  var rect = el.getBoundingClientRect();\n\n  return {\n    left: -(rect.left + window.pageXOffset),\n    top: -(rect.top + window.pageYOffset)\n  };\n}\n\nvar transform = prefixStyle('transform');\n\nvar hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;\n// fix issue #361\nvar hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);\nvar hasTransform = transform !== false;\nvar hasTransition = inBrowser && prefixStyle('transition') in elementStyle;\n\nvar style = {\n  transform: transform,\n  transitionTimingFunction: prefixStyle('transitionTimingFunction'),\n  transitionDuration: prefixStyle('transitionDuration'),\n  transitionDelay: prefixStyle('transitionDelay'),\n  transformOrigin: prefixStyle('transformOrigin'),\n  transitionEnd: prefixStyle('transitionEnd')\n};\n\nvar TOUCH_EVENT = 1;\nvar MOUSE_EVENT = 2;\n\nvar eventType = {\n  touchstart: TOUCH_EVENT,\n  touchmove: TOUCH_EVENT,\n  touchend: TOUCH_EVENT,\n\n  mousedown: MOUSE_EVENT,\n  mousemove: MOUSE_EVENT,\n  mouseup: MOUSE_EVENT\n};\n\nfunction getRect(el) {\n  if (el instanceof window.SVGElement) {\n    var rect = el.getBoundingClientRect();\n    return {\n      top: rect.top,\n      left: rect.left,\n      width: rect.width,\n      height: rect.height\n    };\n  } else {\n    return {\n      top: el.offsetTop,\n      left: el.offsetLeft,\n      width: el.offsetWidth,\n      height: el.offsetHeight\n    };\n  }\n}\n\nfunction preventDefaultException(el, exceptions) {\n  for (var i in exceptions) {\n    if (exceptions[i].test(el[i])) {\n      return true;\n    }\n  }\n  return false;\n}\n\nfunction tap(e, eventName) {\n  var ev = document.createEvent('Event');\n  ev.initEvent(eventName, true, true);\n  ev.pageX = e.pageX;\n  ev.pageY = e.pageY;\n  e.target.dispatchEvent(ev);\n}\n\nfunction click(e) {\n  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';\n\n  var eventSource = void 0;\n  if (e.type === 'mouseup' || e.type === 'mousecancel') {\n    eventSource = e;\n  } else if (e.type === 'touchend' || e.type === 'touchcancel') {\n    eventSource = e.changedTouches[0];\n  }\n  var posSrc = {};\n  if (eventSource) {\n    posSrc.screenX = eventSource.screenX || 0;\n    posSrc.screenY = eventSource.screenY || 0;\n    posSrc.clientX = eventSource.clientX || 0;\n    posSrc.clientY = eventSource.clientY || 0;\n  }\n  var ev = void 0;\n  var bubbles = true;\n  var cancelable = true;\n  if (typeof MouseEvent !== 'undefined') {\n    try {\n      ev = new MouseEvent(event, extend({\n        bubbles: bubbles,\n        cancelable: cancelable\n      }, posSrc));\n    } catch (e) {\n      createEvent();\n    }\n  } else {\n    createEvent();\n  }\n\n  function createEvent() {\n    ev = document.createEvent('Event');\n    ev.initEvent(event, bubbles, cancelable);\n    extend(ev, posSrc);\n  }\n\n  // forwardedTouchEvent set to true in case of the conflict with fastclick\n  ev.forwardedTouchEvent = true;\n  ev._constructed = true;\n  e.target.dispatchEvent(ev);\n}\n\nfunction dblclick(e) {\n  click(e, 'dblclick');\n}\n\nfunction prepend(el, target) {\n  if (target.firstChild) {\n    before(el, target.firstChild);\n  } else {\n    target.appendChild(el);\n  }\n}\n\nfunction before(el, target) {\n  target.parentNode.insertBefore(el, target);\n}\n\nfunction removeChild(el, child) {\n  el.removeChild(child);\n}\n\nvar DEFAULT_OPTIONS = {\n  startX: 0,\n  startY: 0,\n  scrollX: false,\n  scrollY: true,\n  freeScroll: false,\n  directionLockThreshold: 5,\n  eventPassthrough: '',\n  click: false,\n  tap: false,\n  /**\n   * support any side\n   * bounce: {\n   *   top: true,\n   *   bottom: true,\n   *   left: true,\n   *   right: true\n   * }\n   */\n  bounce: true,\n  bounceTime: 800,\n  momentum: true,\n  momentumLimitTime: 300,\n  momentumLimitDistance: 15,\n  swipeTime: 2500,\n  swipeBounceTime: 500,\n  deceleration: 0.0015,\n  flickLimitTime: 200,\n  flickLimitDistance: 100,\n  resizePolling: 60,\n  probeType: 0,\n  preventDefault: true,\n  preventDefaultException: {\n    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/\n  },\n  HWCompositing: true,\n  useTransition: true,\n  useTransform: true,\n  bindToWrapper: false,\n  disableMouse: hasTouch,\n  disableTouch: !hasTouch,\n  observeDOM: true,\n  autoBlur: true,\n  /**\n   * for picker\n   * wheel: {\n   *   selectedIndex: 0,\n   *   rotate: 25,\n   *   adjustTime: 400\n   *   wheelWrapperClass: 'wheel-scroll',\n   *   wheelItemClass: 'wheel-item'\n   * }\n   */\n  wheel: false,\n  /**\n   * for slide\n   * snap: {\n   *   loop: false,\n   *   el: domEl,\n   *   threshold: 0.1,\n   *   stepX: 100,\n   *   stepY: 100,\n   *   speed: 400,\n   *   easing: {\n   *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',\n   *     fn: function (t) {\n   *       return t * (2 - t)\n   *     }\n   *   }\n   *   listenFlick: true\n   * }\n   */\n  snap: false,\n  /**\n   * for scrollbar\n   * scrollbar: {\n   *   fade: true,\n   *   interactive: false\n   * }\n   */\n  scrollbar: false,\n  /**\n   * for pull down and refresh\n   * pullDownRefresh: {\n   *   threshold: 50,\n   *   stop: 20\n   * }\n   */\n  pullDownRefresh: false,\n  /**\n   * for pull up and load\n   * pullUpLoad: {\n   *   threshold: 50\n   * }\n   */\n  pullUpLoad: false,\n  /**\n   * for mouse wheel\n   * mouseWheel: {\n   *   speed: 20,\n   *   invert: false,\n   *   easeTime: 300\n   * }\n   */\n  mouseWheel: false,\n  stopPropagation: false,\n  /**\n   * for zoom\n   * zoom: {\n   *   start: 1,\n   *   min: 1,\n   *   max: 4\n   * }\n   */\n  zoom: false,\n  /**\n   * for infinity\n   * infinity: {\n   *   render(item, div) {\n   *   },\n   *   createTombstone() {\n   *   },\n   *   fetch(count) {\n   *   }\n   * }\n   */\n  infinity: false,\n  /**\n   * for double click\n   * dblclick: {\n   *   delay: 300\n   * }\n   */\n  dblclick: false\n};\n\nfunction initMixin(BScroll) {\n  BScroll.prototype._init = function (el, options) {\n    this._handleOptions(options);\n\n    // init private custom events\n    this._events = {};\n\n    this.x = 0;\n    this.y = 0;\n    this.directionX = 0;\n    this.directionY = 0;\n\n    this.setScale(1);\n\n    this._addDOMEvents();\n\n    this._initExtFeatures();\n\n    this._watchTransition();\n\n    if (this.options.observeDOM) {\n      this._initDOMObserver();\n    }\n\n    if (this.options.autoBlur) {\n      this._handleAutoBlur();\n    }\n\n    this.refresh();\n\n    if (!this.options.snap) {\n      this.scrollTo(this.options.startX, this.options.startY);\n    }\n\n    this.enable();\n  };\n\n  BScroll.prototype.setScale = function (scale) {\n    this.lastScale = isUndef(this.scale) ? scale : this.scale;\n    this.scale = scale;\n  };\n\n  BScroll.prototype._handleOptions = function (options) {\n    this.options = extend({}, DEFAULT_OPTIONS, options);\n\n    this.translateZ = this.options.HWCompositing && hasPerspective ? ' translateZ(0)' : '';\n\n    this.options.useTransition = this.options.useTransition && hasTransition;\n    this.options.useTransform = this.options.useTransform && hasTransform;\n\n    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;\n\n    // If you want eventPassthrough I have to lock one of the axes\n    this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;\n    this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;\n\n    // With eventPassthrough we also need lockDirection mechanism\n    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;\n    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;\n\n    if (this.options.tap === true) {\n      this.options.tap = 'tap';\n    }\n  };\n\n  BScroll.prototype._addDOMEvents = function () {\n    var eventOperation = addEvent;\n    this._handleDOMEvents(eventOperation);\n  };\n\n  BScroll.prototype._removeDOMEvents = function () {\n    var eventOperation = removeEvent;\n    this._handleDOMEvents(eventOperation);\n  };\n\n  BScroll.prototype._handleDOMEvents = function (eventOperation) {\n    var target = this.options.bindToWrapper ? this.wrapper : window;\n    eventOperation(window, 'orientationchange', this);\n    eventOperation(window, 'resize', this);\n\n    if (this.options.click) {\n      eventOperation(this.wrapper, 'click', this, true);\n    }\n\n    if (!this.options.disableMouse) {\n      eventOperation(this.wrapper, 'mousedown', this);\n      eventOperation(target, 'mousemove', this);\n      eventOperation(target, 'mousecancel', this);\n      eventOperation(target, 'mouseup', this);\n    }\n\n    if (hasTouch && !this.options.disableTouch) {\n      eventOperation(this.wrapper, 'touchstart', this);\n      eventOperation(target, 'touchmove', this);\n      eventOperation(target, 'touchcancel', this);\n      eventOperation(target, 'touchend', this);\n    }\n\n    eventOperation(this.scroller, style.transitionEnd, this);\n  };\n\n  BScroll.prototype._initExtFeatures = function () {\n    if (this.options.snap) {\n      this._initSnap();\n    }\n    if (this.options.scrollbar) {\n      this._initScrollbar();\n    }\n    if (this.options.pullUpLoad) {\n      this._initPullUp();\n    }\n    if (this.options.pullDownRefresh) {\n      this._initPullDown();\n    }\n    if (this.options.wheel) {\n      this._initWheel();\n    }\n    if (this.options.mouseWheel) {\n      this._initMouseWheel();\n    }\n    if (this.options.zoom) {\n      this._initZoom();\n    }\n    if (this.options.infinity) {\n      this._initInfinite();\n    }\n  };\n\n  BScroll.prototype._watchTransition = function () {\n    if (typeof Object.defineProperty !== 'function') {\n      return;\n    }\n    var me = this;\n    var isInTransition = false;\n    var key = this.useTransition ? 'isInTransition' : 'isAnimating';\n    Object.defineProperty(this, key, {\n      get: function get() {\n        return isInTransition;\n      },\n      set: function set(newVal) {\n        isInTransition = newVal;\n        // fix issue #359\n        var el = me.scroller.children.length ? me.scroller.children : [me.scroller];\n        var pointerEvents = isInTransition && !me.pulling ? 'none' : 'auto';\n        for (var i = 0; i < el.length; i++) {\n          el[i].style.pointerEvents = pointerEvents;\n        }\n      }\n    });\n  };\n\n  BScroll.prototype._handleAutoBlur = function () {\n    this.on('scrollStart', function () {\n      var activeElement = document.activeElement;\n      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {\n        activeElement.blur();\n      }\n    });\n  };\n\n  BScroll.prototype._initDOMObserver = function () {\n    var _this = this;\n\n    if (typeof MutationObserver !== 'undefined') {\n      var timer = void 0;\n      var observer = new MutationObserver(function (mutations) {\n        // don't do any refresh during the transition, or outside of the boundaries\n        if (_this._shouldNotRefresh()) {\n          return;\n        }\n        var immediateRefresh = false;\n        var deferredRefresh = false;\n        for (var i = 0; i < mutations.length; i++) {\n          var mutation = mutations[i];\n          if (mutation.type !== 'attributes') {\n            immediateRefresh = true;\n            break;\n          } else {\n            if (mutation.target !== _this.scroller) {\n              deferredRefresh = true;\n              break;\n            }\n          }\n        }\n        if (immediateRefresh) {\n          _this.refresh();\n        } else if (deferredRefresh) {\n          // attributes changes too often\n          clearTimeout(timer);\n          timer = setTimeout(function () {\n            if (!_this._shouldNotRefresh()) {\n              _this.refresh();\n            }\n          }, 60);\n        }\n      });\n      var config = {\n        attributes: true,\n        childList: true,\n        subtree: true\n      };\n      observer.observe(this.scroller, config);\n\n      this.on('destroy', function () {\n        observer.disconnect();\n      });\n    } else {\n      this._checkDOMUpdate();\n    }\n  };\n\n  BScroll.prototype._shouldNotRefresh = function () {\n    var outsideBoundaries = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;\n\n    return this.isInTransition || this.stopFromTransition || outsideBoundaries;\n  };\n\n  BScroll.prototype._checkDOMUpdate = function () {\n    var scrollerRect = getRect(this.scroller);\n    var oldWidth = scrollerRect.width;\n    var oldHeight = scrollerRect.height;\n\n    function check() {\n      if (this.destroyed) {\n        return;\n      }\n      scrollerRect = getRect(this.scroller);\n      var newWidth = scrollerRect.width;\n      var newHeight = scrollerRect.height;\n\n      if (oldWidth !== newWidth || oldHeight !== newHeight) {\n        this.refresh();\n      }\n      oldWidth = newWidth;\n      oldHeight = newHeight;\n\n      next.call(this);\n    }\n\n    function next() {\n      var _this2 = this;\n\n      setTimeout(function () {\n        check.call(_this2);\n      }, 1000);\n    }\n\n    next.call(this);\n  };\n\n  BScroll.prototype.handleEvent = function (e) {\n    switch (e.type) {\n      case 'touchstart':\n      case 'mousedown':\n        this._start(e);\n        if (this.options.zoom && e.touches && e.touches.length > 1) {\n          this._zoomStart(e);\n        }\n        break;\n      case 'touchmove':\n      case 'mousemove':\n        if (this.options.zoom && e.touches && e.touches.length > 1) {\n          this._zoom(e);\n        } else {\n          this._move(e);\n        }\n        break;\n      case 'touchend':\n      case 'mouseup':\n      case 'touchcancel':\n      case 'mousecancel':\n        if (this.scaled) {\n          this._zoomEnd(e);\n        } else {\n          this._end(e);\n        }\n        break;\n      case 'orientationchange':\n      case 'resize':\n        this._resize();\n        break;\n      case 'transitionend':\n      case 'webkitTransitionEnd':\n      case 'oTransitionEnd':\n      case 'MSTransitionEnd':\n        this._transitionEnd(e);\n        break;\n      case 'click':\n        if (this.enabled && !e._constructed) {\n          if (!preventDefaultException(e.target, this.options.preventDefaultException)) {\n            e.preventDefault();\n            e.stopPropagation();\n          }\n        }\n        break;\n      case 'wheel':\n      case 'DOMMouseScroll':\n      case 'mousewheel':\n        this._onMouseWheel(e);\n        break;\n    }\n  };\n\n  BScroll.prototype.refresh = function () {\n    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';\n    var wrapperRect = getRect(this.wrapper);\n    this.wrapperWidth = wrapperRect.width;\n    this.wrapperHeight = wrapperRect.height;\n\n    var scrollerRect = getRect(this.scroller);\n    this.scrollerWidth = Math.round(scrollerRect.width * this.scale);\n    this.scrollerHeight = Math.round(scrollerRect.height * this.scale);\n\n    this.relativeX = scrollerRect.left;\n    this.relativeY = scrollerRect.top;\n\n    if (isWrapperStatic) {\n      this.relativeX -= wrapperRect.left;\n      this.relativeY -= wrapperRect.top;\n    }\n\n    this.minScrollX = 0;\n    this.minScrollY = 0;\n\n    var wheel = this.options.wheel;\n    if (wheel) {\n      this.items = this.scroller.children;\n      this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0;\n      if (this.selectedIndex === undefined) {\n        this.selectedIndex = wheel.selectedIndex || 0;\n      }\n      this.options.startY = -this.selectedIndex * this.itemHeight;\n      this.maxScrollX = 0;\n      this.maxScrollY = -this.itemHeight * (this.items.length - 1);\n    } else {\n      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;\n      if (!this.options.infinity) {\n        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;\n      }\n      if (this.maxScrollX < 0) {\n        this.maxScrollX -= this.relativeX;\n        this.minScrollX = -this.relativeX;\n      } else if (this.scale > 1) {\n        this.maxScrollX = this.maxScrollX / 2 - this.relativeX;\n        this.minScrollX = this.maxScrollX;\n      }\n      if (this.maxScrollY < 0) {\n        this.maxScrollY -= this.relativeY;\n        this.minScrollY = -this.relativeY;\n      } else if (this.scale > 1) {\n        this.maxScrollY = this.maxScrollY / 2 - this.relativeY;\n        this.minScrollY = this.maxScrollY;\n      }\n    }\n\n    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX;\n    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY;\n\n    if (!this.hasHorizontalScroll) {\n      this.maxScrollX = this.minScrollX;\n      this.scrollerWidth = this.wrapperWidth;\n    }\n\n    if (!this.hasVerticalScroll) {\n      this.maxScrollY = this.minScrollY;\n      this.scrollerHeight = this.wrapperHeight;\n    }\n\n    this.endTime = 0;\n    this.directionX = 0;\n    this.directionY = 0;\n    this.wrapperOffset = offset(this.wrapper);\n\n    this.trigger('refresh');\n\n    !this.scaled && this.resetPosition();\n  };\n\n  BScroll.prototype.enable = function () {\n    this.enabled = true;\n  };\n\n  BScroll.prototype.disable = function () {\n    this.enabled = false;\n  };\n}\n\nvar ease = {\n  // easeOutQuint\n  swipe: {\n    style: 'cubic-bezier(0.23, 1, 0.32, 1)',\n    fn: function fn(t) {\n      return 1 + --t * t * t * t * t;\n    }\n  },\n  // easeOutQuard\n  swipeBounce: {\n    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',\n    fn: function fn(t) {\n      return t * (2 - t);\n    }\n  },\n  // easeOutQuart\n  bounce: {\n    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',\n    fn: function fn(t) {\n      return 1 - --t * t * t * t;\n    }\n  }\n};\n\nfunction momentum(current, start, time, lowerMargin, upperMargin, wrapperSize, options) {\n  var distance = current - start;\n  var speed = Math.abs(distance) / time;\n\n  var deceleration = options.deceleration,\n      itemHeight = options.itemHeight,\n      swipeBounceTime = options.swipeBounceTime,\n      wheel = options.wheel,\n      swipeTime = options.swipeTime;\n\n  var duration = swipeTime;\n  var rate = wheel ? 4 : 15;\n\n  var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);\n\n  if (wheel && itemHeight) {\n    destination = Math.round(destination / itemHeight) * itemHeight;\n  }\n\n  if (destination < lowerMargin) {\n    destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / rate * speed) : lowerMargin;\n    duration = swipeBounceTime;\n  } else if (destination > upperMargin) {\n    destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed) : upperMargin;\n    duration = swipeBounceTime;\n  }\n\n  return {\n    destination: Math.round(destination),\n    duration: duration\n  };\n}\n\nvar DEFAULT_INTERVAL = 100 / 60;\n\nfunction noop() {}\n\nvar requestAnimationFrame = function () {\n  if (!inBrowser) {\n    /* istanbul ignore if */\n    return noop;\n  }\n  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||\n  // if all else fails, use setTimeout\n  function (callback) {\n    return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.\n  };\n}();\n\nvar cancelAnimationFrame = function () {\n  if (!inBrowser) {\n    /* istanbul ignore if */\n    return noop;\n  }\n  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {\n    window.clearTimeout(id);\n  };\n}();\n\nvar DIRECTION_UP = 1;\nvar DIRECTION_DOWN = -1;\nvar DIRECTION_LEFT = 1;\nvar DIRECTION_RIGHT = -1;\n\nvar PROBE_DEBOUNCE = 1;\n\nvar PROBE_REALTIME = 3;\n\nfunction warn(msg) {\n  console.error('[BScroll warn]: ' + msg);\n}\n\nfunction assert(condition, msg) {\n  if (!condition) {\n    throw new Error('[BScroll] ' + msg);\n  }\n}\n\nfunction coreMixin(BScroll) {\n  BScroll.prototype._start = function (e) {\n    var _eventType = eventType[e.type];\n    if (_eventType !== TOUCH_EVENT) {\n      if (e.button !== 0) {\n        return;\n      }\n    }\n    if (!this.enabled || this.destroyed || this.initiated && this.initiated !== _eventType) {\n      return;\n    }\n    this.initiated = _eventType;\n\n    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {\n      e.preventDefault();\n    }\n    if (this.options.stopPropagation) {\n      e.stopPropagation();\n    }\n\n    this.moved = false;\n    this.distX = 0;\n    this.distY = 0;\n    this.directionX = 0;\n    this.directionY = 0;\n    this.movingDirectionX = 0;\n    this.movingDirectionY = 0;\n    this.directionLocked = 0;\n\n    this._transitionTime();\n    this.startTime = getNow();\n\n    if (this.options.wheel) {\n      this.target = e.target;\n    }\n\n    this.stop();\n\n    var point = e.touches ? e.touches[0] : e;\n\n    this.startX = this.x;\n    this.startY = this.y;\n    this.absStartX = this.x;\n    this.absStartY = this.y;\n    this.pointX = point.pageX;\n    this.pointY = point.pageY;\n\n    this.trigger('beforeScrollStart');\n  };\n\n  BScroll.prototype._move = function (e) {\n    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {\n      return;\n    }\n\n    if (this.options.preventDefault) {\n      e.preventDefault();\n    }\n    if (this.options.stopPropagation) {\n      e.stopPropagation();\n    }\n\n    var point = e.touches ? e.touches[0] : e;\n    var deltaX = point.pageX - this.pointX;\n    var deltaY = point.pageY - this.pointY;\n\n    this.pointX = point.pageX;\n    this.pointY = point.pageY;\n\n    this.distX += deltaX;\n    this.distY += deltaY;\n\n    var absDistX = Math.abs(this.distX);\n    var absDistY = Math.abs(this.distY);\n\n    var timestamp = getNow();\n\n    // We need to move at least momentumLimitDistance pixels for the scrolling to initiate\n    if (timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance) {\n      return;\n    }\n\n    // If you are scrolling in one direction lock the other\n    if (!this.directionLocked && !this.options.freeScroll) {\n      if (absDistX > absDistY + this.options.directionLockThreshold) {\n        this.directionLocked = 'h'; // lock horizontally\n      } else if (absDistY >= absDistX + this.options.directionLockThreshold) {\n        this.directionLocked = 'v'; // lock vertically\n      } else {\n        this.directionLocked = 'n'; // no lock\n      }\n    }\n\n    if (this.directionLocked === 'h') {\n      if (this.options.eventPassthrough === 'vertical') {\n        e.preventDefault();\n      } else if (this.options.eventPassthrough === 'horizontal') {\n        this.initiated = false;\n        return;\n      }\n      deltaY = 0;\n    } else if (this.directionLocked === 'v') {\n      if (this.options.eventPassthrough === 'horizontal') {\n        e.preventDefault();\n      } else if (this.options.eventPassthrough === 'vertical') {\n        this.initiated = false;\n        return;\n      }\n      deltaX = 0;\n    }\n\n    deltaX = this.hasHorizontalScroll ? deltaX : 0;\n    deltaY = this.hasVerticalScroll ? deltaY : 0;\n    this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;\n    this.movingDirectionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;\n\n    var newX = this.x + deltaX;\n    var newY = this.y + deltaY;\n\n    var top = false;\n    var bottom = false;\n    var left = false;\n    var right = false;\n    // Slow down or stop if outside of the boundaries\n    var bounce = this.options.bounce;\n    if (bounce !== false) {\n      top = bounce.top === undefined ? true : bounce.top;\n      bottom = bounce.bottom === undefined ? true : bounce.bottom;\n      left = bounce.left === undefined ? true : bounce.left;\n      right = bounce.right === undefined ? true : bounce.right;\n    }\n    if (newX > this.minScrollX || newX < this.maxScrollX) {\n      if (newX > this.minScrollX && left || newX < this.maxScrollX && right) {\n        newX = this.x + deltaX / 3;\n      } else {\n        newX = newX > this.minScrollX ? this.minScrollX : this.maxScrollX;\n      }\n    }\n    if (newY > this.minScrollY || newY < this.maxScrollY) {\n      if (newY > this.minScrollY && top || newY < this.maxScrollY && bottom) {\n        newY = this.y + deltaY / 3;\n      } else {\n        newY = newY > this.minScrollY ? this.minScrollY : this.maxScrollY;\n      }\n    }\n\n    if (!this.moved) {\n      this.moved = true;\n      this.trigger('scrollStart');\n    }\n\n    this._translate(newX, newY);\n\n    if (timestamp - this.startTime > this.options.momentumLimitTime) {\n      this.startTime = timestamp;\n      this.startX = this.x;\n      this.startY = this.y;\n\n      if (this.options.probeType === PROBE_DEBOUNCE) {\n        this.trigger('scroll', {\n          x: this.x,\n          y: this.y\n        });\n      }\n    }\n\n    if (this.options.probeType > PROBE_DEBOUNCE) {\n      this.trigger('scroll', {\n        x: this.x,\n        y: this.y\n      });\n    }\n\n    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;\n    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;\n\n    var pX = this.pointX - scrollLeft;\n    var pY = this.pointY - scrollTop;\n\n    if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance || pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {\n      this._end(e);\n    }\n  };\n\n  BScroll.prototype._end = function (e) {\n    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {\n      return;\n    }\n    this.initiated = false;\n\n    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {\n      e.preventDefault();\n    }\n    if (this.options.stopPropagation) {\n      e.stopPropagation();\n    }\n\n    this.trigger('touchEnd', {\n      x: this.x,\n      y: this.y\n    });\n\n    this.isInTransition = false;\n\n    // ensures that the last position is rounded\n    var newX = Math.round(this.x);\n    var newY = Math.round(this.y);\n\n    var deltaX = newX - this.absStartX;\n    var deltaY = newY - this.absStartY;\n    this.directionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;\n    this.directionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;\n\n    // if configure pull down refresh, check it first\n    if (this.options.pullDownRefresh && this._checkPullDown()) {\n      return;\n    }\n\n    // check if it is a click operation\n    if (this._checkClick(e)) {\n      this.trigger('scrollCancel');\n      return;\n    }\n\n    // reset if we are outside of the boundaries\n    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {\n      return;\n    }\n\n    this._translate(newX, newY);\n\n    this.endTime = getNow();\n    var duration = this.endTime - this.startTime;\n    var absDistX = Math.abs(newX - this.startX);\n    var absDistY = Math.abs(newY - this.startY);\n\n    // flick\n    if (this._events.flick && duration < this.options.flickLimitTime && absDistX < this.options.flickLimitDistance && absDistY < this.options.flickLimitDistance) {\n      this.trigger('flick');\n      return;\n    }\n\n    var time = 0;\n    // start momentum animation if needed\n    if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {\n      var top = false;\n      var bottom = false;\n      var left = false;\n      var right = false;\n      var bounce = this.options.bounce;\n      if (bounce !== false) {\n        top = bounce.top === undefined ? true : bounce.top;\n        bottom = bounce.bottom === undefined ? true : bounce.bottom;\n        left = bounce.left === undefined ? true : bounce.left;\n        right = bounce.right === undefined ? true : bounce.right;\n      }\n      var wrapperWidth = this.directionX === DIRECTION_RIGHT && left || this.directionX === DIRECTION_LEFT && right ? this.wrapperWidth : 0;\n      var wrapperHeight = this.directionY === DIRECTION_DOWN && top || this.directionY === DIRECTION_UP && bottom ? this.wrapperHeight : 0;\n      var momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.minScrollX, wrapperWidth, this.options) : { destination: newX, duration: 0 };\n      var momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options) : { destination: newY, duration: 0 };\n      newX = momentumX.destination;\n      newY = momentumY.destination;\n      time = Math.max(momentumX.duration, momentumY.duration);\n      this.isInTransition = true;\n    } else {\n      if (this.options.wheel) {\n        newY = Math.round(newY / this.itemHeight) * this.itemHeight;\n        time = this.options.wheel.adjustTime || 400;\n      }\n    }\n\n    var easing = ease.swipe;\n    if (this.options.snap) {\n      var snap = this._nearestSnap(newX, newY);\n      this.currentPage = snap;\n      time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);\n      newX = snap.x;\n      newY = snap.y;\n\n      this.directionX = 0;\n      this.directionY = 0;\n      easing = this.options.snap.easing || ease.bounce;\n    }\n\n    if (newX !== this.x || newY !== this.y) {\n      // change easing function when scroller goes out of the boundaries\n      if (newX > this.minScrollX || newX < this.maxScrollX || newY > this.minScrollY || newY < this.maxScrollY) {\n        easing = ease.swipeBounce;\n      }\n      this.scrollTo(newX, newY, time, easing);\n      return;\n    }\n\n    if (this.options.wheel) {\n      this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight));\n    }\n    this.trigger('scrollEnd', {\n      x: this.x,\n      y: this.y\n    });\n  };\n\n  BScroll.prototype._checkClick = function (e) {\n    // when in the process of pulling down, it should not prevent click\n    var preventClick = this.stopFromTransition && !this.pulling;\n    this.stopFromTransition = false;\n\n    // we scrolled less than 15 pixels\n    if (!this.moved) {\n      if (this.options.wheel) {\n        if (this.target && this.target.classList.contains(this.options.wheel.wheelWrapperClass)) {\n          var index = Math.abs(Math.round(this.y / this.itemHeight));\n          var _offset = Math.round((this.pointY + offsetToBody(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);\n          this.target = this.items[index + _offset];\n        }\n        this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, true, true, ease.swipe);\n        return true;\n      } else {\n        if (!preventClick) {\n          var _dblclick = this.options.dblclick;\n          var dblclickTrigged = false;\n          if (_dblclick && this.lastClickTime) {\n            var _dblclick$delay = _dblclick.delay,\n                delay = _dblclick$delay === undefined ? 300 : _dblclick$delay;\n\n            if (getNow() - this.lastClickTime < delay) {\n              dblclickTrigged = true;\n              dblclick(e);\n            }\n          }\n          if (this.options.tap) {\n            tap(e, this.options.tap);\n          }\n\n          if (this.options.click && !preventDefaultException(e.target, this.options.preventDefaultException)) {\n            click(e);\n          }\n          this.lastClickTime = dblclickTrigged ? null : getNow();\n          return true;\n        }\n        return false;\n      }\n    }\n    return false;\n  };\n\n  BScroll.prototype._resize = function () {\n    var _this = this;\n\n    if (!this.enabled) {\n      return;\n    }\n    // fix a scroll problem under Android condition\n    if (isAndroid) {\n      this.wrapper.scrollTop = 0;\n    }\n    clearTimeout(this.resizeTimeout);\n    this.resizeTimeout = setTimeout(function () {\n      _this.refresh();\n    }, this.options.resizePolling);\n  };\n\n  BScroll.prototype._startProbe = function () {\n    cancelAnimationFrame(this.probeTimer);\n    this.probeTimer = requestAnimationFrame(probe);\n\n    var me = this;\n\n    function probe() {\n      var pos = me.getComputedPosition();\n      me.trigger('scroll', pos);\n      if (!me.isInTransition) {\n        me.trigger('scrollEnd', pos);\n        return;\n      }\n      me.probeTimer = requestAnimationFrame(probe);\n    }\n  };\n\n  BScroll.prototype._transitionTime = function () {\n    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n    this.scrollerStyle[style.transitionDuration] = time + 'ms';\n\n    if (this.options.wheel) {\n      for (var i = 0; i < this.items.length; i++) {\n        this.items[i].style[style.transitionDuration] = time + 'ms';\n      }\n    }\n\n    if (this.indicators) {\n      for (var _i = 0; _i < this.indicators.length; _i++) {\n        this.indicators[_i].transitionTime(time);\n      }\n    }\n  };\n\n  BScroll.prototype._transitionTimingFunction = function (easing) {\n    this.scrollerStyle[style.transitionTimingFunction] = easing;\n\n    if (this.options.wheel) {\n      for (var i = 0; i < this.items.length; i++) {\n        this.items[i].style[style.transitionTimingFunction] = easing;\n      }\n    }\n\n    if (this.indicators) {\n      for (var _i2 = 0; _i2 < this.indicators.length; _i2++) {\n        this.indicators[_i2].transitionTimingFunction(easing);\n      }\n    }\n  };\n\n  BScroll.prototype._transitionEnd = function (e) {\n    if (e.target !== this.scroller || !this.isInTransition) {\n      return;\n    }\n\n    this._transitionTime();\n    var needReset = !this.pulling || this.movingDirectionY === DIRECTION_UP;\n    if (needReset && !this.resetPosition(this.options.bounceTime, ease.bounce)) {\n      this.isInTransition = false;\n      if (this.options.probeType !== PROBE_REALTIME) {\n        this.trigger('scrollEnd', {\n          x: this.x,\n          y: this.y\n        });\n      }\n    }\n  };\n\n  BScroll.prototype._translate = function (x, y, scale) {\n    assert(!isUndef(x) && !isUndef(y), 'Translate x or y is null or undefined.');\n    if (isUndef(scale)) {\n      scale = this.scale;\n    }\n    if (this.options.useTransform) {\n      this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')' + this.translateZ;\n    } else {\n      x = Math.round(x);\n      y = Math.round(y);\n      this.scrollerStyle.left = x + 'px';\n      this.scrollerStyle.top = y + 'px';\n    }\n\n    if (this.options.wheel) {\n      var _options$wheel$rotate = this.options.wheel.rotate,\n          rotate = _options$wheel$rotate === undefined ? 25 : _options$wheel$rotate;\n\n      for (var i = 0; i < this.items.length; i++) {\n        var deg = rotate * (y / this.itemHeight + i);\n        this.items[i].style[style.transform] = 'rotateX(' + deg + 'deg)';\n      }\n    }\n\n    this.x = x;\n    this.y = y;\n    this.setScale(scale);\n\n    if (this.indicators) {\n      for (var _i3 = 0; _i3 < this.indicators.length; _i3++) {\n        this.indicators[_i3].updatePosition();\n      }\n    }\n  };\n\n  BScroll.prototype._animate = function (destX, destY, duration, easingFn) {\n    var me = this;\n    var startX = this.x;\n    var startY = this.y;\n    var startScale = this.lastScale;\n    var destScale = this.scale;\n    var startTime = getNow();\n    var destTime = startTime + duration;\n\n    function step() {\n      var now = getNow();\n\n      if (now >= destTime) {\n        me.isAnimating = false;\n        me._translate(destX, destY, destScale);\n\n        me.trigger('scroll', {\n          x: me.x,\n          y: me.y\n        });\n\n        if (!me.pulling && !me.resetPosition(me.options.bounceTime)) {\n          me.trigger('scrollEnd', {\n            x: me.x,\n            y: me.y\n          });\n        }\n        return;\n      }\n      now = (now - startTime) / duration;\n      var easing = easingFn(now);\n      var newX = (destX - startX) * easing + startX;\n      var newY = (destY - startY) * easing + startY;\n      var newScale = (destScale - startScale) * easing + startScale;\n\n      me._translate(newX, newY, newScale);\n\n      if (me.isAnimating) {\n        me.animateTimer = requestAnimationFrame(step);\n      }\n\n      if (me.options.probeType === PROBE_REALTIME) {\n        me.trigger('scroll', {\n          x: me.x,\n          y: me.y\n        });\n      }\n    }\n\n    this.isAnimating = true;\n    cancelAnimationFrame(this.animateTimer);\n    step();\n  };\n\n  BScroll.prototype.scrollBy = function (x, y) {\n    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;\n\n    x = this.x + x;\n    y = this.y + y;\n\n    this.scrollTo(x, y, time, easing);\n  };\n\n  BScroll.prototype.scrollTo = function (x, y) {\n    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;\n\n    this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y);\n\n    if (!time || this.options.useTransition) {\n      this._transitionTimingFunction(easing.style);\n      this._transitionTime(time);\n      this._translate(x, y);\n\n      if (time && this.options.probeType === PROBE_REALTIME) {\n        this._startProbe();\n      }\n\n      if (!time && (x !== this.x || y !== this.y)) {\n        this.trigger('scroll', {\n          x: x,\n          y: y\n        });\n        // force reflow to put everything in position\n        this._reflow = document.body.offsetHeight;\n        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {\n          this.trigger('scrollEnd', {\n            x: x,\n            y: y\n          });\n        }\n      }\n\n      if (this.options.wheel) {\n        if (y > this.minScrollY) {\n          this.selectedIndex = 0;\n        } else if (y < this.maxScrollY) {\n          this.selectedIndex = this.items.length - 1;\n        } else {\n          this.selectedIndex = Math.round(Math.abs(y / this.itemHeight));\n        }\n      }\n    } else {\n      this._animate(x, y, time, easing.fn);\n    }\n  };\n\n  BScroll.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {\n    if (!el) {\n      return;\n    }\n    el = el.nodeType ? el : this.scroller.querySelector(el);\n\n    if (this.options.wheel && !el.classList.contains(this.options.wheel.wheelItemClass)) {\n      return;\n    }\n\n    var pos = offset(el);\n    pos.left -= this.wrapperOffset.left;\n    pos.top -= this.wrapperOffset.top;\n\n    // if offsetX/Y are true we center the element to the screen\n    if (offsetX === true) {\n      offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);\n    }\n    if (offsetY === true) {\n      offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);\n    }\n\n    pos.left -= offsetX || 0;\n    pos.top -= offsetY || 0;\n    pos.left = pos.left > this.minScrollX ? this.minScrollX : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;\n    pos.top = pos.top > this.minScrollY ? this.minScrollY : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;\n\n    if (this.options.wheel) {\n      pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;\n    }\n\n    this.scrollTo(pos.left, pos.top, time, easing);\n  };\n\n  BScroll.prototype.resetPosition = function () {\n    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var easeing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ease.bounce;\n\n    var x = this.x;\n    var roundX = Math.round(x);\n    if (!this.hasHorizontalScroll || roundX > this.minScrollX) {\n      x = this.minScrollX;\n    } else if (roundX < this.maxScrollX) {\n      x = this.maxScrollX;\n    }\n\n    var y = this.y;\n    var roundY = Math.round(y);\n    if (!this.hasVerticalScroll || roundY > this.minScrollY) {\n      y = this.minScrollY;\n    } else if (roundY < this.maxScrollY) {\n      y = this.maxScrollY;\n    }\n\n    if (x === this.x && y === this.y) {\n      return false;\n    }\n\n    this.scrollTo(x, y, time, easeing);\n\n    return true;\n  };\n\n  BScroll.prototype.getComputedPosition = function () {\n    var matrix = window.getComputedStyle(this.scroller, null);\n    var x = void 0;\n    var y = void 0;\n\n    if (this.options.useTransform) {\n      matrix = matrix[style.transform].split(')')[0].split(', ');\n      x = +(matrix[12] || matrix[4]);\n      y = +(matrix[13] || matrix[5]);\n    } else {\n      x = +matrix.left.replace(/[^-\\d.]/g, '');\n      y = +matrix.top.replace(/[^-\\d.]/g, '');\n    }\n\n    return {\n      x: x,\n      y: y\n    };\n  };\n\n  BScroll.prototype.stop = function () {\n    if (this.options.useTransition && this.isInTransition) {\n      this.isInTransition = false;\n      cancelAnimationFrame(this.probeTimer);\n      var pos = this.getComputedPosition();\n      this._translate(pos.x, pos.y);\n      if (this.options.wheel) {\n        this.target = this.items[Math.round(-pos.y / this.itemHeight)];\n      } else {\n        this.trigger('scrollEnd', {\n          x: this.x,\n          y: this.y\n        });\n      }\n      this.stopFromTransition = true;\n    } else if (!this.options.useTransition && this.isAnimating) {\n      this.isAnimating = false;\n      cancelAnimationFrame(this.animateTimer);\n      this.trigger('scrollEnd', {\n        x: this.x,\n        y: this.y\n      });\n      this.stopFromTransition = true;\n    }\n  };\n\n  BScroll.prototype.destroy = function () {\n    this.destroyed = true;\n    this.trigger('destroy');\n    if (this.options.useTransition) {\n      cancelAnimationFrame(this.probeTimer);\n    } else {\n      cancelAnimationFrame(this.animateTimer);\n    }\n    this._removeDOMEvents();\n    // remove custom events\n    this._events = {};\n  };\n}\n\nfunction snapMixin(BScroll) {\n  BScroll.prototype._initSnap = function () {\n    var _this = this;\n\n    this.currentPage = {};\n    var snap = this.options.snap;\n\n    if (snap.loop) {\n      var children = this.scroller.children;\n      if (children.length > 1) {\n        prepend(children[children.length - 1].cloneNode(true), this.scroller);\n        this.scroller.appendChild(children[1].cloneNode(true));\n      } else {\n        // Loop does not make any sense if there is only one child.\n        snap.loop = false;\n      }\n    }\n\n    var el = snap.el;\n    if (typeof el === 'string') {\n      el = this.scroller.querySelectorAll(el);\n    }\n\n    this.on('refresh', function () {\n      _this.pages = [];\n\n      if (!_this.wrapperWidth || !_this.wrapperHeight || !_this.scrollerWidth || !_this.scrollerHeight) {\n        return;\n      }\n\n      var stepX = snap.stepX || _this.wrapperWidth;\n      var stepY = snap.stepY || _this.wrapperHeight;\n\n      var x = 0;\n      var y = void 0;\n      var cx = void 0;\n      var cy = void 0;\n      var i = 0;\n      var l = void 0;\n      var m = 0;\n      var n = void 0;\n      var rect = void 0;\n      if (!el) {\n        cx = Math.round(stepX / 2);\n        cy = Math.round(stepY / 2);\n\n        while (x > -_this.scrollerWidth) {\n          _this.pages[i] = [];\n          l = 0;\n          y = 0;\n\n          while (y > -_this.scrollerHeight) {\n            _this.pages[i][l] = {\n              x: Math.max(x, _this.maxScrollX),\n              y: Math.max(y, _this.maxScrollY),\n              width: stepX,\n              height: stepY,\n              cx: x - cx,\n              cy: y - cy\n            };\n\n            y -= stepY;\n            l++;\n          }\n\n          x -= stepX;\n          i++;\n        }\n      } else {\n        l = el.length;\n        n = -1;\n\n        for (; i < l; i++) {\n          rect = getRect(el[i]);\n          if (i === 0 || rect.left <= getRect(el[i - 1]).left) {\n            m = 0;\n            n++;\n          }\n\n          if (!_this.pages[m]) {\n            _this.pages[m] = [];\n          }\n\n          x = Math.max(-rect.left, _this.maxScrollX);\n          y = Math.max(-rect.top, _this.maxScrollY);\n          cx = x - Math.round(rect.width / 2);\n          cy = y - Math.round(rect.height / 2);\n\n          _this.pages[m][n] = {\n            x: x,\n            y: y,\n            width: rect.width,\n            height: rect.height,\n            cx: cx,\n            cy: cy\n          };\n\n          if (x > _this.maxScrollX) {\n            m++;\n          }\n        }\n      }\n\n      _this._checkSnapLoop();\n\n      var initPageX = snap._loopX ? 1 : 0;\n      var initPageY = snap._loopY ? 1 : 0;\n      _this._goToPage(_this.currentPage.pageX || initPageX, _this.currentPage.pageY || initPageY, 0);\n\n      // Update snap threshold if needed.\n      var snapThreshold = snap.threshold;\n      if (snapThreshold % 1 === 0) {\n        _this.snapThresholdX = snapThreshold;\n        _this.snapThresholdY = snapThreshold;\n      } else {\n        _this.snapThresholdX = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].width * snapThreshold);\n        _this.snapThresholdY = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].height * snapThreshold);\n      }\n    });\n\n    this.on('scrollEnd', function () {\n      if (snap.loop) {\n        if (snap._loopX) {\n          if (_this.currentPage.pageX === 0) {\n            _this._goToPage(_this.pages.length - 2, _this.currentPage.pageY, 0);\n          }\n          if (_this.currentPage.pageX === _this.pages.length - 1) {\n            _this._goToPage(1, _this.currentPage.pageY, 0);\n          }\n        } else {\n          if (_this.currentPage.pageY === 0) {\n            _this._goToPage(_this.currentPage.pageX, _this.pages[0].length - 2, 0);\n          }\n          if (_this.currentPage.pageY === _this.pages[0].length - 1) {\n            _this._goToPage(_this.currentPage.pageX, 1, 0);\n          }\n        }\n      }\n    });\n\n    if (snap.listenFlick !== false) {\n      this.on('flick', function () {\n        var time = snap.speed || Math.max(Math.max(Math.min(Math.abs(_this.x - _this.startX), 1000), Math.min(Math.abs(_this.y - _this.startY), 1000)), 300);\n\n        _this._goToPage(_this.currentPage.pageX + _this.directionX, _this.currentPage.pageY + _this.directionY, time);\n      });\n    }\n\n    this.on('destroy', function () {\n      if (snap.loop) {\n        var _children = _this.scroller.children;\n        if (_children.length > 2) {\n          removeChild(_this.scroller, _children[_children.length - 1]);\n          removeChild(_this.scroller, _children[0]);\n        }\n      }\n    });\n  };\n\n  BScroll.prototype._checkSnapLoop = function () {\n    var snap = this.options.snap;\n\n    if (!snap.loop || !this.pages || !this.pages.length) {\n      return;\n    }\n\n    if (this.pages.length > 1) {\n      snap._loopX = true;\n    }\n    if (this.pages[0] && this.pages[0].length > 1) {\n      snap._loopY = true;\n    }\n    if (snap._loopX && snap._loopY) {\n      warn('Loop does not support two direction at the same time.');\n    }\n  };\n\n  BScroll.prototype._nearestSnap = function (x, y) {\n    if (!this.pages.length) {\n      return { x: 0, y: 0, pageX: 0, pageY: 0 };\n    }\n\n    var i = 0;\n    // Check if we exceeded the snap threshold\n    if (Math.abs(x - this.absStartX) <= this.snapThresholdX && Math.abs(y - this.absStartY) <= this.snapThresholdY) {\n      return this.currentPage;\n    }\n\n    if (x > this.minScrollX) {\n      x = this.minScrollX;\n    } else if (x < this.maxScrollX) {\n      x = this.maxScrollX;\n    }\n\n    if (y > this.minScrollY) {\n      y = this.minScrollY;\n    } else if (y < this.maxScrollY) {\n      y = this.maxScrollY;\n    }\n\n    var l = this.pages.length;\n    for (; i < l; i++) {\n      if (x >= this.pages[i][0].cx) {\n        x = this.pages[i][0].x;\n        break;\n      }\n    }\n\n    l = this.pages[i].length;\n\n    var m = 0;\n    for (; m < l; m++) {\n      if (y >= this.pages[0][m].cy) {\n        y = this.pages[0][m].y;\n        break;\n      }\n    }\n\n    if (i === this.currentPage.pageX) {\n      i += this.directionX;\n\n      if (i < 0) {\n        i = 0;\n      } else if (i >= this.pages.length) {\n        i = this.pages.length - 1;\n      }\n\n      x = this.pages[i][0].x;\n    }\n\n    if (m === this.currentPage.pageY) {\n      m += this.directionY;\n\n      if (m < 0) {\n        m = 0;\n      } else if (m >= this.pages[0].length) {\n        m = this.pages[0].length - 1;\n      }\n\n      y = this.pages[0][m].y;\n    }\n\n    return {\n      x: x,\n      y: y,\n      pageX: i,\n      pageY: m\n    };\n  };\n\n  BScroll.prototype._goToPage = function (x) {\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    var time = arguments[2];\n    var easing = arguments[3];\n\n    var snap = this.options.snap;\n\n    if (!snap || !this.pages || !this.pages.length) {\n      return;\n    }\n\n    easing = easing || snap.easing || ease.bounce;\n\n    if (x >= this.pages.length) {\n      x = this.pages.length - 1;\n    } else if (x < 0) {\n      x = 0;\n    }\n\n    if (!this.pages[x]) {\n      return;\n    }\n\n    if (y >= this.pages[x].length) {\n      y = this.pages[x].length - 1;\n    } else if (y < 0) {\n      y = 0;\n    }\n\n    var posX = this.pages[x][y].x;\n    var posY = this.pages[x][y].y;\n\n    time = time === undefined ? snap.speed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;\n\n    this.currentPage = {\n      x: posX,\n      y: posY,\n      pageX: x,\n      pageY: y\n    };\n    this.scrollTo(posX, posY, time, easing);\n  };\n\n  BScroll.prototype.goToPage = function (x, y, time, easing) {\n    var snap = this.options.snap;\n    if (!snap || !this.pages || !this.pages.length) {\n      return;\n    }\n\n    if (snap.loop) {\n      var len = void 0;\n      if (snap._loopX) {\n        len = this.pages.length - 2;\n        if (x >= len) {\n          x = len - 1;\n        } else if (x < 0) {\n          x = 0;\n        }\n        x += 1;\n      } else {\n        len = this.pages[0].length - 2;\n        if (y >= len) {\n          y = len - 1;\n        } else if (y < 0) {\n          y = 0;\n        }\n        y += 1;\n      }\n    }\n    this._goToPage(x, y, time, easing);\n  };\n\n  BScroll.prototype.next = function (time, easing) {\n    var snap = this.options.snap;\n    if (!snap) {\n      return;\n    }\n\n    var x = this.currentPage.pageX;\n    var y = this.currentPage.pageY;\n\n    x++;\n    if (x >= this.pages.length && this.hasVerticalScroll) {\n      x = 0;\n      y++;\n    }\n\n    this._goToPage(x, y, time, easing);\n  };\n\n  BScroll.prototype.prev = function (time, easing) {\n    var snap = this.options.snap;\n    if (!snap) {\n      return;\n    }\n\n    var x = this.currentPage.pageX;\n    var y = this.currentPage.pageY;\n\n    x--;\n    if (x < 0 && this.hasVerticalScroll) {\n      x = 0;\n      y--;\n    }\n\n    this._goToPage(x, y, time, easing);\n  };\n\n  BScroll.prototype.getCurrentPage = function () {\n    var snap = this.options.snap;\n    if (!snap) {\n      return null;\n    }\n\n    if (snap.loop) {\n      var currentPage = void 0;\n      if (snap._loopX) {\n        currentPage = extend({}, this.currentPage, {\n          pageX: this.currentPage.pageX - 1\n        });\n      } else {\n        currentPage = extend({}, this.currentPage, {\n          pageY: this.currentPage.pageY - 1\n        });\n      }\n      return currentPage;\n    }\n    return this.currentPage;\n  };\n}\n\nfunction wheelMixin(BScroll) {\n  BScroll.prototype.wheelTo = function () {\n    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n    if (this.options.wheel) {\n      this.y = -index * this.itemHeight;\n      this.scrollTo(0, this.y);\n    }\n  };\n\n  BScroll.prototype.getSelectedIndex = function () {\n    return this.options.wheel && this.selectedIndex;\n  };\n\n  BScroll.prototype._initWheel = function () {\n    var wheel = this.options.wheel;\n    if (!wheel.wheelWrapperClass) {\n      wheel.wheelWrapperClass = 'wheel-scroll';\n    }\n    if (!wheel.wheelItemClass) {\n      wheel.wheelItemClass = 'wheel-item';\n    }\n    if (wheel.selectedIndex === undefined) {\n      wheel.selectedIndex = 0;\n      warn('wheel option selectedIndex is required!');\n    }\n  };\n}\n\nvar INDICATOR_MIN_LEN = 8;\n\nfunction scrollbarMixin(BScroll) {\n  BScroll.prototype._initScrollbar = function () {\n    var _this = this;\n\n    var _options$scrollbar = this.options.scrollbar,\n        _options$scrollbar$fa = _options$scrollbar.fade,\n        fade = _options$scrollbar$fa === undefined ? true : _options$scrollbar$fa,\n        _options$scrollbar$in = _options$scrollbar.interactive,\n        interactive = _options$scrollbar$in === undefined ? false : _options$scrollbar$in;\n\n    this.indicators = [];\n    var indicator = void 0;\n\n    if (this.options.scrollX) {\n      indicator = {\n        el: createScrollbar('horizontal'),\n        direction: 'horizontal',\n        fade: fade,\n        interactive: interactive\n      };\n      this._insertScrollBar(indicator.el);\n\n      this.indicators.push(new Indicator(this, indicator));\n    }\n\n    if (this.options.scrollY) {\n      indicator = {\n        el: createScrollbar('vertical'),\n        direction: 'vertical',\n        fade: fade,\n        interactive: interactive\n      };\n      this._insertScrollBar(indicator.el);\n      this.indicators.push(new Indicator(this, indicator));\n    }\n\n    this.on('refresh', function () {\n      for (var i = 0; i < _this.indicators.length; i++) {\n        _this.indicators[i].refresh();\n      }\n    });\n\n    if (fade) {\n      this.on('scrollEnd', function () {\n        for (var i = 0; i < _this.indicators.length; i++) {\n          _this.indicators[i].fade();\n        }\n      });\n\n      this.on('scrollCancel', function () {\n        for (var i = 0; i < _this.indicators.length; i++) {\n          _this.indicators[i].fade();\n        }\n      });\n\n      this.on('scrollStart', function () {\n        for (var i = 0; i < _this.indicators.length; i++) {\n          _this.indicators[i].fade(true);\n        }\n      });\n\n      this.on('beforeScrollStart', function () {\n        for (var i = 0; i < _this.indicators.length; i++) {\n          _this.indicators[i].fade(true, true);\n        }\n      });\n    }\n\n    this.on('destroy', function () {\n      _this._removeScrollBars();\n    });\n  };\n\n  BScroll.prototype._insertScrollBar = function (scrollbar) {\n    this.wrapper.appendChild(scrollbar);\n  };\n\n  BScroll.prototype._removeScrollBars = function () {\n    for (var i = 0; i < this.indicators.length; i++) {\n      this.indicators[i].destroy();\n    }\n  };\n}\n\nfunction createScrollbar(direction) {\n  var scrollbar = document.createElement('div');\n  var indicator = document.createElement('div');\n\n  scrollbar.style.cssText = 'position:absolute;z-index:9999;pointerEvents:none';\n  indicator.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';\n\n  indicator.className = 'bscroll-indicator';\n\n  if (direction === 'horizontal') {\n    scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';\n    indicator.style.height = '100%';\n    scrollbar.className = 'bscroll-horizontal-scrollbar';\n  } else {\n    scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';\n    indicator.style.width = '100%';\n    scrollbar.className = 'bscroll-vertical-scrollbar';\n  }\n\n  scrollbar.style.cssText += ';overflow:hidden';\n  scrollbar.appendChild(indicator);\n\n  return scrollbar;\n}\n\nfunction Indicator(scroller, options) {\n  this.wrapper = options.el;\n  this.wrapperStyle = this.wrapper.style;\n  this.indicator = this.wrapper.children[0];\n  this.indicatorStyle = this.indicator.style;\n  this.scroller = scroller;\n  this.direction = options.direction;\n  if (options.fade) {\n    this.visible = 0;\n    this.wrapperStyle.opacity = '0';\n  } else {\n    this.visible = 1;\n  }\n\n  this.sizeRatioX = 1;\n  this.sizeRatioY = 1;\n  this.maxPosX = 0;\n  this.maxPosY = 0;\n  this.x = 0;\n  this.y = 0;\n\n  if (options.interactive) {\n    this._addDOMEvents();\n  }\n}\n\nIndicator.prototype.handleEvent = function (e) {\n  switch (e.type) {\n    case 'touchstart':\n    case 'mousedown':\n      this._start(e);\n      break;\n    case 'touchmove':\n    case 'mousemove':\n      this._move(e);\n      break;\n    case 'touchend':\n    case 'mouseup':\n    case 'touchcancel':\n    case 'mousecancel':\n      this._end(e);\n      break;\n  }\n};\n\nIndicator.prototype.refresh = function () {\n  if (this._shouldShow()) {\n    this.transitionTime();\n    this._calculate();\n    this.updatePosition();\n  }\n};\n\nIndicator.prototype.fade = function (visible, hold) {\n  var _this2 = this;\n\n  if (hold && !this.visible) {\n    return;\n  }\n\n  var time = visible ? 250 : 500;\n\n  visible = visible ? '1' : '0';\n\n  this.wrapperStyle[style.transitionDuration] = time + 'ms';\n\n  clearTimeout(this.fadeTimeout);\n  this.fadeTimeout = setTimeout(function () {\n    _this2.wrapperStyle.opacity = visible;\n    _this2.visible = +visible;\n  }, 0);\n};\n\nIndicator.prototype.updatePosition = function () {\n  if (this.direction === 'vertical') {\n    var y = Math.round(this.sizeRatioY * this.scroller.y);\n\n    if (y < 0) {\n      this.transitionTime(500);\n      var height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN);\n      this.indicatorStyle.height = height + 'px';\n      y = 0;\n    } else if (y > this.maxPosY) {\n      this.transitionTime(500);\n      var _height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, INDICATOR_MIN_LEN);\n      this.indicatorStyle.height = _height + 'px';\n      y = this.maxPosY + this.indicatorHeight - _height;\n    } else {\n      this.indicatorStyle.height = this.indicatorHeight + 'px';\n    }\n    this.y = y;\n\n    if (this.scroller.options.useTransform) {\n      this.indicatorStyle[style.transform] = 'translateY(' + y + 'px)' + this.scroller.translateZ;\n    } else {\n      this.indicatorStyle.top = y + 'px';\n    }\n  } else {\n    var x = Math.round(this.sizeRatioX * this.scroller.x);\n\n    if (x < 0) {\n      this.transitionTime(500);\n      var width = Math.max(this.indicatorWidth + x * 3, INDICATOR_MIN_LEN);\n      this.indicatorStyle.width = width + 'px';\n      x = 0;\n    } else if (x > this.maxPosX) {\n      this.transitionTime(500);\n      var _width = Math.max(this.indicatorWidth - (x - this.maxPosX) * 3, INDICATOR_MIN_LEN);\n      this.indicatorStyle.width = _width + 'px';\n      x = this.maxPosX + this.indicatorWidth - _width;\n    } else {\n      this.indicatorStyle.width = this.indicatorWidth + 'px';\n    }\n\n    this.x = x;\n\n    if (this.scroller.options.useTransform) {\n      this.indicatorStyle[style.transform] = 'translateX(' + x + 'px)' + this.scroller.translateZ;\n    } else {\n      this.indicatorStyle.left = x + 'px';\n    }\n  }\n};\n\nIndicator.prototype.transitionTime = function () {\n  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n  this.indicatorStyle[style.transitionDuration] = time + 'ms';\n};\n\nIndicator.prototype.transitionTimingFunction = function (easing) {\n  this.indicatorStyle[style.transitionTimingFunction] = easing;\n};\n\nIndicator.prototype.destroy = function () {\n  this._removeDOMEvents();\n  this.wrapper.parentNode.removeChild(this.wrapper);\n};\n\nIndicator.prototype._start = function (e) {\n  var point = e.touches ? e.touches[0] : e;\n\n  e.preventDefault();\n  e.stopPropagation();\n\n  this.transitionTime();\n\n  this.initiated = true;\n  this.moved = false;\n  this.lastPointX = point.pageX;\n  this.lastPointY = point.pageY;\n\n  this.startTime = getNow();\n\n  this._handleMoveEvents(addEvent);\n  this.scroller.trigger('beforeScrollStart');\n};\n\nIndicator.prototype._move = function (e) {\n  var point = e.touches ? e.touches[0] : e;\n\n  e.preventDefault();\n  e.stopPropagation();\n\n  if (!this.moved) {\n    this.scroller.trigger('scrollStart');\n  }\n\n  this.moved = true;\n\n  var deltaX = point.pageX - this.lastPointX;\n  this.lastPointX = point.pageX;\n\n  var deltaY = point.pageY - this.lastPointY;\n  this.lastPointY = point.pageY;\n\n  var newX = this.x + deltaX;\n  var newY = this.y + deltaY;\n\n  this._pos(newX, newY);\n};\n\nIndicator.prototype._end = function (e) {\n  if (!this.initiated) {\n    return;\n  }\n  this.initiated = false;\n\n  e.preventDefault();\n  e.stopPropagation();\n\n  this._handleMoveEvents(removeEvent);\n\n  var snapOption = this.scroller.options.snap;\n  if (snapOption) {\n    var speed = snapOption.speed,\n        _snapOption$easing = snapOption.easing,\n        easing = _snapOption$easing === undefined ? ease.bounce : _snapOption$easing;\n\n    var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);\n\n    var time = speed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);\n\n    if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {\n      this.scroller.directionX = 0;\n      this.scroller.directionY = 0;\n      this.scroller.currentPage = snap;\n      this.scroller.scrollTo(snap.x, snap.y, time, easing);\n    }\n  }\n\n  if (this.moved) {\n    this.scroller.trigger('scrollEnd', {\n      x: this.scroller.x,\n      y: this.scroller.y\n    });\n  }\n};\n\nIndicator.prototype._pos = function (x, y) {\n  if (x < 0) {\n    x = 0;\n  } else if (x > this.maxPosX) {\n    x = this.maxPosX;\n  }\n\n  if (y < 0) {\n    y = 0;\n  } else if (y > this.maxPosY) {\n    y = this.maxPosY;\n  }\n\n  x = Math.round(x / this.sizeRatioX);\n  y = Math.round(y / this.sizeRatioY);\n\n  this.scroller.scrollTo(x, y);\n  this.scroller.trigger('scroll', {\n    x: this.scroller.x,\n    y: this.scroller.y\n  });\n};\n\nIndicator.prototype._shouldShow = function () {\n  if (this.direction === 'vertical' && this.scroller.hasVerticalScroll || this.direction === 'horizontal' && this.scroller.hasHorizontalScroll) {\n    this.wrapper.style.display = '';\n    return true;\n  }\n  this.wrapper.style.display = 'none';\n  return false;\n};\n\nIndicator.prototype._calculate = function () {\n  if (this.direction === 'vertical') {\n    var wrapperHeight = this.wrapper.clientHeight;\n    this.indicatorHeight = Math.max(Math.round(wrapperHeight * wrapperHeight / (this.scroller.scrollerHeight || wrapperHeight || 1)), INDICATOR_MIN_LEN);\n    this.indicatorStyle.height = this.indicatorHeight + 'px';\n\n    this.maxPosY = wrapperHeight - this.indicatorHeight;\n\n    this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;\n  } else {\n    var wrapperWidth = this.wrapper.clientWidth;\n    this.indicatorWidth = Math.max(Math.round(wrapperWidth * wrapperWidth / (this.scroller.scrollerWidth || wrapperWidth || 1)), INDICATOR_MIN_LEN);\n    this.indicatorStyle.width = this.indicatorWidth + 'px';\n\n    this.maxPosX = wrapperWidth - this.indicatorWidth;\n\n    this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;\n  }\n};\n\nIndicator.prototype._addDOMEvents = function () {\n  var eventOperation = addEvent;\n  this._handleDOMEvents(eventOperation);\n};\n\nIndicator.prototype._removeDOMEvents = function () {\n  var eventOperation = removeEvent;\n  this._handleDOMEvents(eventOperation);\n  this._handleMoveEvents(eventOperation);\n};\n\nIndicator.prototype._handleMoveEvents = function (eventOperation) {\n  if (!this.scroller.options.disableTouch) {\n    eventOperation(window, 'touchmove', this);\n  }\n  if (!this.scroller.options.disableMouse) {\n    eventOperation(window, 'mousemove', this);\n  }\n};\n\nIndicator.prototype._handleDOMEvents = function (eventOperation) {\n  if (!this.scroller.options.disableTouch) {\n    eventOperation(this.indicator, 'touchstart', this);\n    eventOperation(window, 'touchend', this);\n  }\n  if (!this.scroller.options.disableMouse) {\n    eventOperation(this.indicator, 'mousedown', this);\n    eventOperation(window, 'mouseup', this);\n  }\n};\n\nfunction pullDownMixin(BScroll) {\n  BScroll.prototype._initPullDown = function () {\n    // must watch scroll in real time\n    this.options.probeType = PROBE_REALTIME;\n  };\n\n  BScroll.prototype._checkPullDown = function () {\n    var _options$pullDownRefr = this.options.pullDownRefresh,\n        _options$pullDownRefr2 = _options$pullDownRefr.threshold,\n        threshold = _options$pullDownRefr2 === undefined ? 90 : _options$pullDownRefr2,\n        _options$pullDownRefr3 = _options$pullDownRefr.stop,\n        stop = _options$pullDownRefr3 === undefined ? 40 : _options$pullDownRefr3;\n\n    // check if a real pull down action\n\n    if (this.directionY !== DIRECTION_DOWN || this.y < threshold) {\n      return false;\n    }\n\n    if (!this.pulling) {\n      this.pulling = true;\n      this.trigger('pullingDown');\n    }\n    this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);\n\n    return this.pulling;\n  };\n\n  BScroll.prototype.finishPullDown = function () {\n    this.pulling = false;\n    this.resetPosition(this.options.bounceTime, ease.bounce);\n  };\n\n  BScroll.prototype.openPullDown = function () {\n    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n\n    this.options.pullDownRefresh = config;\n    this._initPullDown();\n  };\n\n  BScroll.prototype.closePullDown = function () {\n    this.options.pullDownRefresh = false;\n  };\n}\n\nfunction pullUpMixin(BScroll) {\n  BScroll.prototype._initPullUp = function () {\n    // must watch scroll in real time\n    this.options.probeType = PROBE_REALTIME;\n\n    this.pullupWatching = false;\n    this._watchPullUp();\n  };\n\n  BScroll.prototype._watchPullUp = function () {\n    if (this.pullupWatching) {\n      return;\n    }\n    this.pullupWatching = true;\n    this.on('scroll', this._checkToEnd);\n  };\n\n  BScroll.prototype._checkToEnd = function (pos) {\n    var _this = this;\n\n    var _options$pullUpLoad$t = this.options.pullUpLoad.threshold,\n        threshold = _options$pullUpLoad$t === undefined ? 0 : _options$pullUpLoad$t;\n\n    if (this.movingDirectionY === DIRECTION_UP && pos.y <= this.maxScrollY + threshold) {\n      // reset pullupWatching status after scroll end.\n      this.once('scrollEnd', function () {\n        _this.pullupWatching = false;\n      });\n      this.trigger('pullingUp');\n      this.off('scroll', this._checkToEnd);\n    }\n  };\n\n  BScroll.prototype.finishPullUp = function () {\n    var _this2 = this;\n\n    if (this.pullupWatching) {\n      this.once('scrollEnd', function () {\n        _this2._watchPullUp();\n      });\n    } else {\n      this._watchPullUp();\n    }\n  };\n\n  BScroll.prototype.openPullUp = function () {\n    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n\n    this.options.pullUpLoad = config;\n    this._initPullUp();\n  };\n\n  BScroll.prototype.closePullUp = function () {\n    this.options.pullUpLoad = false;\n    if (!this.pullupWatching) {\n      return;\n    }\n    this.pullupWatching = false;\n    this.off('scroll', this._checkToEnd);\n  };\n}\n\nfunction mouseWheelMixin(BScroll) {\n  BScroll.prototype._initMouseWheel = function () {\n    var _this = this;\n\n    this._handleMouseWheelEvent(addEvent);\n\n    this.on('destroy', function () {\n      clearTimeout(_this.mouseWheelTimer);\n      clearTimeout(_this.mouseWheelEndTimer);\n      _this._handleMouseWheelEvent(removeEvent);\n    });\n\n    this.firstWheelOpreation = true;\n  };\n\n  BScroll.prototype._handleMouseWheelEvent = function (eventOperation) {\n    eventOperation(this.wrapper, 'wheel', this);\n    eventOperation(this.wrapper, 'mousewheel', this);\n    eventOperation(this.wrapper, 'DOMMouseScroll', this);\n  };\n\n  BScroll.prototype._onMouseWheel = function (e) {\n    var _this2 = this;\n\n    if (!this.enabled) {\n      return;\n    }\n    e.preventDefault();\n\n    if (this.options.stopPropagation) {\n      e.stopPropagation();\n    }\n\n    if (this.firstWheelOpreation) {\n      this.trigger('scrollStart');\n    }\n    this.firstWheelOpreation = false;\n\n    var _options$mouseWheel = this.options.mouseWheel,\n        _options$mouseWheel$s = _options$mouseWheel.speed,\n        speed = _options$mouseWheel$s === undefined ? 20 : _options$mouseWheel$s,\n        _options$mouseWheel$i = _options$mouseWheel.invert,\n        invert = _options$mouseWheel$i === undefined ? false : _options$mouseWheel$i,\n        _options$mouseWheel$e = _options$mouseWheel.easeTime,\n        easeTime = _options$mouseWheel$e === undefined ? 300 : _options$mouseWheel$e;\n\n\n    clearTimeout(this.mouseWheelTimer);\n    this.mouseWheelTimer = setTimeout(function () {\n      if (!_this2.options.snap && !easeTime) {\n        _this2.trigger('scrollEnd', {\n          x: _this2.x,\n          y: _this2.y\n        });\n      }\n      _this2.firstWheelOpreation = true;\n    }, 400);\n\n    var wheelDeltaX = void 0;\n    var wheelDeltaY = void 0;\n\n    switch (true) {\n      case 'deltaX' in e:\n        if (e.deltaMode === 1) {\n          wheelDeltaX = -e.deltaX * speed;\n          wheelDeltaY = -e.deltaY * speed;\n        } else {\n          wheelDeltaX = -e.deltaX;\n          wheelDeltaY = -e.deltaY;\n        }\n        break;\n      case 'wheelDeltaX' in e:\n        wheelDeltaX = e.wheelDeltaX / 120 * speed;\n        wheelDeltaY = e.wheelDeltaY / 120 * speed;\n        break;\n      case 'wheelDelta' in e:\n        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;\n        break;\n      case 'detail' in e:\n        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;\n        break;\n      default:\n        return;\n    }\n\n    var direction = invert ? -1 : 1;\n    wheelDeltaX *= direction;\n    wheelDeltaY *= direction;\n\n    if (!this.hasVerticalScroll) {\n      wheelDeltaX = wheelDeltaY;\n      wheelDeltaY = 0;\n    }\n\n    var newX = void 0;\n    var newY = void 0;\n    if (this.options.snap) {\n      newX = this.currentPage.pageX;\n      newY = this.currentPage.pageY;\n\n      if (wheelDeltaX > 0) {\n        newX--;\n      } else if (wheelDeltaX < 0) {\n        newX++;\n      }\n\n      if (wheelDeltaY > 0) {\n        newY--;\n      } else if (wheelDeltaY < 0) {\n        newY++;\n      }\n\n      this._goToPage(newX, newY);\n      return;\n    }\n\n    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);\n    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);\n\n    this.movingDirectionX = this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;\n    this.movingDirectionY = this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;\n\n    if (newX > this.minScrollX) {\n      newX = this.minScrollX;\n    } else if (newX < this.maxScrollX) {\n      newX = this.maxScrollX;\n    }\n\n    if (newY > this.minScrollY) {\n      newY = this.minScrollY;\n    } else if (newY < this.maxScrollY) {\n      newY = this.maxScrollY;\n    }\n\n    var needTriggerEnd = this.y === newY;\n    this.scrollTo(newX, newY, easeTime, ease.swipe);\n    this.trigger('scroll', {\n      x: this.x,\n      y: this.y\n    });\n    clearTimeout(this.mouseWheelEndTimer);\n    if (needTriggerEnd) {\n      this.mouseWheelEndTimer = setTimeout(function () {\n        _this2.trigger('scrollEnd', {\n          x: _this2.x,\n          y: _this2.y\n        });\n      }, easeTime);\n    }\n  };\n}\n\nfunction zoomMixin(BScroll) {\n  BScroll.prototype._initZoom = function () {\n    var _options$zoom = this.options.zoom,\n        _options$zoom$start = _options$zoom.start,\n        start = _options$zoom$start === undefined ? 1 : _options$zoom$start,\n        _options$zoom$min = _options$zoom.min,\n        min = _options$zoom$min === undefined ? 1 : _options$zoom$min,\n        _options$zoom$max = _options$zoom.max,\n        max = _options$zoom$max === undefined ? 4 : _options$zoom$max;\n\n    this.scale = Math.min(Math.max(start, min), max);\n    this.setScale(this.scale);\n    this.scrollerStyle[style.transformOrigin] = '0 0';\n  };\n\n  BScroll.prototype._zoomTo = function (scale, originX, originY, startScale) {\n    this.scaled = true;\n\n    var lastScale = scale / (startScale || this.scale);\n    this.setScale(scale);\n\n    this.refresh();\n\n    var newX = Math.round(this.startX - (originX - this.relativeX) * (lastScale - 1));\n    var newY = Math.round(this.startY - (originY - this.relativeY) * (lastScale - 1));\n\n    if (newX > this.minScrollX) {\n      newX = this.minScrollX;\n    } else if (newX < this.maxScrollX) {\n      newX = this.maxScrollX;\n    }\n\n    if (newY > this.minScrollY) {\n      newY = this.minScrollY;\n    } else if (newY < this.maxScrollY) {\n      newY = this.maxScrollY;\n    }\n\n    if (this.x !== newX || this.y !== newY) {\n      this.scrollTo(newX, newY, this.options.bounceTime);\n    }\n\n    this.scaled = false;\n  };\n\n  BScroll.prototype.zoomTo = function (scale, x, y) {\n    var _offsetToBody = offsetToBody(this.wrapper),\n        left = _offsetToBody.left,\n        top = _offsetToBody.top;\n\n    var originX = x + left - this.x;\n    var originY = y + top - this.y;\n    this._zoomTo(scale, originX, originY);\n  };\n\n  BScroll.prototype._zoomStart = function (e) {\n    var firstFinger = e.touches[0];\n    var secondFinger = e.touches[1];\n    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);\n    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);\n\n    this.startDistance = getDistance(deltaX, deltaY);\n    this.startScale = this.scale;\n\n    var _offsetToBody2 = offsetToBody(this.wrapper),\n        left = _offsetToBody2.left,\n        top = _offsetToBody2.top;\n\n    this.originX = Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.x;\n    this.originY = Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.y;\n\n    this.trigger('zoomStart');\n  };\n\n  BScroll.prototype._zoom = function (e) {\n    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {\n      return;\n    }\n\n    if (this.options.preventDefault) {\n      e.preventDefault();\n    }\n\n    if (this.options.stopPropagation) {\n      e.stopPropagation();\n    }\n\n    var firstFinger = e.touches[0];\n    var secondFinger = e.touches[1];\n    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);\n    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);\n    var distance = getDistance(deltaX, deltaY);\n    var scale = distance / this.startDistance * this.startScale;\n\n    this.scaled = true;\n\n    var _options$zoom2 = this.options.zoom,\n        _options$zoom2$min = _options$zoom2.min,\n        min = _options$zoom2$min === undefined ? 1 : _options$zoom2$min,\n        _options$zoom2$max = _options$zoom2.max,\n        max = _options$zoom2$max === undefined ? 4 : _options$zoom2$max;\n\n\n    if (scale < min) {\n      scale = 0.5 * min * Math.pow(2.0, scale / min);\n    } else if (scale > max) {\n      scale = 2.0 * max * Math.pow(0.5, max / scale);\n    }\n\n    var lastScale = scale / this.startScale;\n\n    var x = this.startX - (this.originX - this.relativeX) * (lastScale - 1);\n    var y = this.startY - (this.originY - this.relativeY) * (lastScale - 1);\n\n    this.setScale(scale);\n\n    this.scrollTo(x, y, 0);\n  };\n\n  BScroll.prototype._zoomEnd = function (e) {\n    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {\n      return;\n    }\n\n    if (this.options.preventDefault) {\n      e.preventDefault();\n    }\n\n    if (this.options.stopPropagation) {\n      e.stopPropagation();\n    }\n\n    this.isInTransition = false;\n    this.isAnimating = false;\n    this.initiated = 0;\n\n    var _options$zoom3 = this.options.zoom,\n        _options$zoom3$min = _options$zoom3.min,\n        min = _options$zoom3$min === undefined ? 1 : _options$zoom3$min,\n        _options$zoom3$max = _options$zoom3.max,\n        max = _options$zoom3$max === undefined ? 4 : _options$zoom3$max;\n\n\n    var scale = this.scale > max ? max : this.scale < min ? min : this.scale;\n\n    this._zoomTo(scale, this.originX, this.originY, this.startScale);\n\n    this.trigger('zoomEnd');\n  };\n}\n\n// import { ease } from '../util/ease'\n\n// Number of items to instantiate beyond current view in the scroll direction.\nvar RUNWAY_ITEMS = 30;\n\n// Number of items to instantiate beyond current view in the opposite direction.\nvar RUNWAY_ITEMS_OPPOSITE = 10;\n\n// The animation interval (in ms) for fading in content from tombstones.\nvar ANIMATION_DURATION_MS = 200;\n\n// The number of pixels of default additional length to allow scrolling to.\nvar DEFAULT_SCROLL_RUNWAY = 2000;\n\nfunction infiniteMixin(BScroll) {\n  BScroll.prototype._initInfinite = function () {\n    this.options.probeType = 3;\n    this.maxScrollY = -DEFAULT_SCROLL_RUNWAY;\n    this.infiniteScroller = new InfiniteScroller(this, this.options.infinity);\n  };\n}\n\nfunction isTombstoneNode(node) {\n  if (node && node.classList) {\n    return node.classList.contains('tombstone');\n  }\n}\n\nfunction InfiniteScroller(scroller, options) {\n  var _this = this;\n\n  this.options = options;\n  assert(typeof this.options.createTombstone === 'function', 'Infinite scroll need createTombstone Function to create tombstone');\n\n  assert(typeof this.options.fetch === 'function', 'Infinite scroll need fetch Function to fetch new data.');\n\n  assert(typeof this.options.render === 'function', 'Infinite scroll need render Function to render each item.');\n\n  this.firstAttachedItem = 0;\n  this.lastAttachedItem = 0;\n\n  this.anchorScrollTop = 0;\n  this.anchorItem = {\n    index: 0,\n    offset: 0\n  };\n  this.tombstoneHeight = 0;\n  this.tombstoneWidth = 0;\n  this.tombstones = [];\n\n  this.items = [];\n  this.loadedItems = 0;\n  this.requestInProgress = false;\n  this.hasMore = true;\n\n  this.scroller = scroller;\n  this.wrapperEl = this.scroller.wrapper;\n  this.scrollerEl = this.scroller.scroller;\n  this.scroller.on('scroll', function () {\n    _this.onScroll();\n  });\n  this.scroller.on('resize', function () {\n    _this.onResize();\n  });\n\n  this.onResize();\n}\n\nInfiniteScroller.prototype.onScroll = function () {\n  var scrollTop = -this.scroller.y;\n  var delta = scrollTop - this.anchorScrollTop;\n  if (scrollTop === 0) {\n    this.anchorItem = {\n      index: 0,\n      offset: 0\n    };\n  } else {\n    this.anchorItem = this._calculateAnchoredItem(this.anchorItem, delta);\n  }\n\n  this.anchorScrollTop = scrollTop;\n  var lastScreenItem = this._calculateAnchoredItem(this.anchorItem, this.wrapperEl.offsetHeight);\n\n  var start = this.anchorItem.index;\n  var end = lastScreenItem.index;\n  if (delta < 0) {\n    start -= RUNWAY_ITEMS;\n    end += RUNWAY_ITEMS_OPPOSITE;\n  } else {\n    start -= RUNWAY_ITEMS_OPPOSITE;\n    end += RUNWAY_ITEMS;\n  }\n  this.fill(start, end);\n  this.maybeRequestContent();\n};\n\nInfiniteScroller.prototype.onResize = function () {\n  var tombstone = this.options.createTombstone();\n  tombstone.style.position = 'absolute';\n  this.scrollerEl.appendChild(tombstone);\n  tombstone.style.display = '';\n  this.tombstoneHeight = tombstone.offsetHeight;\n  this.tombstoneWidth = tombstone.offsetWidth;\n  this.scrollerEl.removeChild(tombstone);\n\n  for (var i = 0; i < this.items.length; i++) {\n    this.items[i].height = this.items[i].width = 0;\n  }\n\n  this.onScroll();\n};\n\nInfiniteScroller.prototype.fill = function (start, end) {\n  this.firstAttachedItem = Math.max(0, start);\n  if (!this.hasMore) {\n    end = Math.min(end, this.items.length);\n  }\n  this.lastAttachedItem = end;\n  this.attachContent();\n};\n\nInfiniteScroller.prototype.maybeRequestContent = function () {\n  var _this2 = this;\n\n  if (this.requestInProgress || !this.hasMore) {\n    return;\n  }\n  var itemsNeeded = this.lastAttachedItem - this.loadedItems;\n  if (itemsNeeded <= 0) {\n    return;\n  }\n  this.requestInProgress = true;\n  this.options.fetch(itemsNeeded).then(function (items) {\n    _this2.requestInProgress = false;\n    if (items) {\n      _this2.addContent(items);\n    } else {\n      _this2.hasMore = false;\n      var tombstoneLen = _this2._removeTombstones();\n      var curPos = 0;\n      if (_this2.anchorItem.index <= _this2.items.length) {\n        curPos = _this2._fixScrollPosition();\n        _this2._setupAnimations({}, curPos);\n        _this2.scroller.resetPosition(_this2.scroller.options.bounceTime);\n      } else {\n        _this2.anchorItem.index -= tombstoneLen;\n        curPos = _this2._fixScrollPosition();\n        _this2._setupAnimations({}, curPos);\n        _this2.scroller.stop();\n        _this2.scroller.resetPosition();\n        _this2.onScroll();\n      }\n    }\n  });\n};\n\nInfiniteScroller.prototype.addContent = function (items) {\n  for (var i = 0; i < items.length; i++) {\n    if (this.items.length <= this.loadedItems) {\n      this._addItem();\n    }\n    this.items[this.loadedItems++].data = items[i];\n  }\n  this.attachContent();\n  this.maybeRequestContent();\n};\n\nInfiniteScroller.prototype.attachContent = function () {\n  var unusedNodes = this._collectUnusedNodes();\n  var tombstoneAnimations = this._createDOMNodes(unusedNodes);\n  this._cleanupUnusedNodes(unusedNodes);\n  this._cacheNodeSize();\n  var curPos = this._fixScrollPosition();\n  this._setupAnimations(tombstoneAnimations, curPos);\n};\n\nInfiniteScroller.prototype.resetMore = function () {\n  this.hasMore = true;\n};\n\nInfiniteScroller.prototype._removeTombstones = function () {\n  var markIndex = void 0;\n  var tombstoneLen = 0;\n  var itemLen = this.items.length;\n  for (var i = 0; i < itemLen; i++) {\n    var currentNode = this.items[i].node;\n    var currentData = this.items[i].data;\n    if ((!currentNode || isTombstoneNode(currentNode)) && !currentData) {\n      if (!markIndex) {\n        markIndex = i;\n      }\n      if (currentNode) {\n        this.scrollerEl.removeChild(currentNode);\n      }\n    }\n  }\n  tombstoneLen = itemLen - markIndex;\n  this.items.splice(markIndex);\n  this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length);\n  return tombstoneLen;\n};\n\nInfiniteScroller.prototype._collectUnusedNodes = function () {\n  var unusedNodes = [];\n  for (var i = 0; i < this.items.length; i++) {\n    // Skip the items which should be visible.\n    if (i === this.firstAttachedItem) {\n      i = this.lastAttachedItem - 1;\n      continue;\n    }\n    var currentNode = this.items[i].node;\n    if (currentNode) {\n      if (isTombstoneNode(currentNode)) {\n        // Cache tombstones for reuse\n        this.tombstones.push(currentNode);\n        this.tombstones[this.tombstones.length - 1].style.display = 'none';\n      } else {\n        unusedNodes.push(currentNode);\n      }\n    }\n    this.items[i].node = null;\n  }\n  return unusedNodes;\n};\n\nInfiniteScroller.prototype._createDOMNodes = function (unusedNodes) {\n  var tombstoneAnimations = {};\n  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {\n    while (this.items.length <= i) {\n      this._addItem();\n    }\n    var currentNode = this.items[i].node;\n    var currentData = this.items[i].data;\n    if (currentNode) {\n      if (isTombstoneNode(currentNode) && currentData) {\n        currentNode.style.zIndex = 1;\n        tombstoneAnimations[i] = [currentNode, this.items[i].top - this.anchorScrollTop];\n        this.items[i].node = null;\n      } else {\n        continue;\n      }\n    }\n    var node = currentData ? this.options.render(currentData, unusedNodes.pop()) : this._getTombStone();\n    node.style.position = 'absolute';\n    this.items[i].top = -1;\n    this.scrollerEl.appendChild(node);\n    this.items[i].node = node;\n  }\n  return tombstoneAnimations;\n};\n\nInfiniteScroller.prototype._cleanupUnusedNodes = function (unusedNodes) {\n  while (unusedNodes.length) {\n    this.scrollerEl.removeChild(unusedNodes.pop());\n  }\n};\n\nInfiniteScroller.prototype._cacheNodeSize = function () {\n  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {\n    // Only cache the height if we have the real contents, not a placeholder.\n    if (this.items[i].data && !this.items[i].height) {\n      this.items[i].height = this.items[i].node.offsetHeight;\n      this.items[i].width = this.items[i].node.offsetWidth;\n    }\n  }\n};\n\nInfiniteScroller.prototype._fixScrollPosition = function () {\n  this.anchorScrollTop = 0;\n  for (var _i = 0; _i < this.anchorItem.index; _i++) {\n    this.anchorScrollTop += this.items[_i].height || this.tombstoneHeight;\n  }\n  this.anchorScrollTop += this.anchorItem.offset;\n\n  // Position all nodes.\n  var curPos = this.anchorScrollTop - this.anchorItem.offset;\n  var i = this.anchorItem.index;\n  while (i > this.firstAttachedItem) {\n    curPos -= this.items[i - 1].height || this.tombstoneHeight;\n    i--;\n  }\n\n  return curPos;\n};\n\nInfiniteScroller.prototype._setupAnimations = function (tombstoneAnimations, curPos) {\n  var _this3 = this;\n\n  for (var i in tombstoneAnimations) {\n    var animation = tombstoneAnimations[i];\n    this.items[i].node.style.transform = 'translateY(' + (this.anchorScrollTop + animation[1]) + 'px) scale(' + this.tombstoneWidth / this.items[i].width + ', ' + this.tombstoneHeight / this.items[i].height + ')';\n    // Call offsetTop on the nodes to be animated to force them to apply current transforms.\n    /* eslint-disable no-unused-expressions */\n    this.items[i].node.offsetTop;\n    animation[0].offsetTop;\n    this.items[i].node.style.transition = 'transform ' + ANIMATION_DURATION_MS + 'ms';\n  }\n\n  for (var _i2 = this.firstAttachedItem; _i2 < this.lastAttachedItem; _i2++) {\n    var _animation = tombstoneAnimations[_i2];\n    if (_animation) {\n      var tombstoneNode = _animation[0];\n      tombstoneNode.style.transition = 'transform ' + ANIMATION_DURATION_MS + 'ms, opacity ' + ANIMATION_DURATION_MS + 'ms';\n      tombstoneNode.style.transform = 'translateY(' + curPos + 'px) scale(' + this.items[_i2].width / this.tombstoneWidth + ', ' + this.items[_i2].height / this.tombstoneHeight + ')';\n      tombstoneNode.style.opacity = 0;\n    }\n    if (curPos !== this.items[_i2].top) {\n      if (!_animation) {\n        this.items[_i2].node.style.transition = '';\n      }\n      this.items[_i2].node.style.transform = 'translateY(' + curPos + 'px)';\n    }\n    this.items[_i2].top = curPos;\n    curPos += this.items[_i2].height || this.tombstoneHeight;\n  }\n\n  this.scroller.maxScrollY = -(curPos - this.wrapperEl.offsetHeight + (this.hasMore ? DEFAULT_SCROLL_RUNWAY : 0));\n\n  setTimeout(function () {\n    for (var _i3 in tombstoneAnimations) {\n      var _animation2 = tombstoneAnimations[_i3];\n      _animation2[0].style.display = 'none';\n      // Tombstone can be recycled now.\n      _this3.tombstones.push(_animation2[0]);\n    }\n  }, ANIMATION_DURATION_MS);\n};\n\nInfiniteScroller.prototype._getTombStone = function () {\n  var tombstone = this.tombstones.pop();\n  if (tombstone) {\n    tombstone.style.display = '';\n    tombstone.style.opacity = 1;\n    tombstone.style.transform = '';\n    tombstone.style.transition = '';\n    return tombstone;\n  }\n  return this.options.createTombstone();\n};\n\nInfiniteScroller.prototype._addItem = function () {\n  this.items.push({\n    data: null,\n    node: null,\n    height: 0,\n    width: 0,\n    top: 0\n  });\n};\n\nInfiniteScroller.prototype._calculateAnchoredItem = function (initialAnchor, delta) {\n  if (delta === 0) {\n    return initialAnchor;\n  }\n  var i = initialAnchor.index;\n  var tombstones = 0;\n\n  delta += initialAnchor.offset;\n  if (delta < 0) {\n    while (delta < 0 && i > 0 && this.items[i - 1].height) {\n      delta += this.items[i - 1].height;\n      i--;\n    }\n    tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneHeight));\n  } else {\n    while (delta > 0 && i < this.items.length && this.items[i].height && this.items[i].height < delta) {\n      delta -= this.items[i].height;\n      i++;\n    }\n    if (i >= this.items.length || !this.items[i].height) {\n      tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneHeight);\n    }\n  }\n  i += tombstones;\n  delta -= tombstones * this.tombstoneHeight;\n\n  return {\n    index: i,\n    offset: delta\n  };\n};\n\nfunction BScroll(el, options) {\n  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;\n  if (!this.wrapper) {\n    warn('Can not resolve the wrapper DOM.');\n  }\n  this.scroller = this.wrapper.children[0];\n  if (!this.scroller) {\n    warn('The wrapper need at least one child element to be scroller.');\n  }\n  // cache style for better performance\n  this.scrollerStyle = this.scroller.style;\n\n  this._init(el, options);\n}\n\ninitMixin(BScroll);\ncoreMixin(BScroll);\neventMixin(BScroll);\nsnapMixin(BScroll);\nwheelMixin(BScroll);\nscrollbarMixin(BScroll);\npullDownMixin(BScroll);\npullUpMixin(BScroll);\nmouseWheelMixin(BScroll);\nzoomMixin(BScroll);\ninfiniteMixin(BScroll);\n\nBScroll.Version = '1.12.6';\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BScroll);\n\n\n//# sourceURL=webpack:///./node_modules/_better-scroll@1.12.6@better-scroll/dist/bscroll.esm.js?");

/***/ }),

/***/ "./src/css/base.css":
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/base.css?");

/***/ }),

/***/ "./src/css/category.less":
/*!*******************************!*\
  !*** ./src/css/category.less ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/category.less?");

/***/ }),

/***/ "./src/js/category.js":
/*!****************************!*\
  !*** ./src/js/category.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! @/css/base.css */ \"./src/css/base.css\");\n\n__webpack_require__(/*! @/css/category.less */ \"./src/css/category.less\");\n\nvar _betterScroll = __webpack_require__(/*! better-scroll */ \"./node_modules/_better-scroll@1.12.6@better-scroll/dist/bscroll.esm.js\");\n\nvar _betterScroll2 = _interopRequireDefault(_betterScroll);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// 热更新\nif (true) {\n    module.hot.accept();\n} // import '@/css/category.css'\n\n\nwindow.onload = function () {\n\n    //左侧滑动\n    leftswipe();\n};\n\nvar leftswipe = function leftswipe() {\n\n    //1.上下滑动 (touch事件，位移)\n    var parentBox = document.querySelector('.jd_category_left');\n\n    var childBox = parentBox.querySelector('ul');\n    new _betterScroll2.default(parentBox, {\n        scrollY: true\n    });\n};\n\n//# sourceURL=webpack:///./src/js/category.js?");

/***/ })

/******/ });